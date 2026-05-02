import os
import json
from google import genai
from typing import Dict, Any, List, Optional
from dotenv import load_dotenv

try:
    from backend.static_responses import get_test_by_id, get_all_tests
except ModuleNotFoundError:
    from static_responses import get_test_by_id, get_all_tests

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

client = None
if GEMINI_API_KEY:
    try:
        client = genai.Client(api_key=GEMINI_API_KEY)
    except Exception as e:
        print(f"Error initializing Gemini client: {e}")

def is_gemini_configured() -> bool:
    return client is not None

def call_gemini_chat(message: str, history: List[Dict[str, str]]) -> Dict[str, Any]:
    if not is_gemini_configured():
        return None

    try:
        system_instruction = (
            "You are the FSSAI DART (Detect Adulteration with Rapid Test) Food Safety Assistant. "
            "Your goal is to help users understand how to detect food adulteration at home using simple tests. "
            "Be helpful, informative, and concise. "
            "If the user asks about a specific food item, provide the relevant DART test information. "
            "If the user provides an observation, analyze it and tell them if the food might be adulterated. "
            "Use the provided knowledge about DART tests to inform your answers. "
            "Format your responses using Markdown."
        )

        tests = get_all_tests()
        tests_context = "Here are some of the DART tests you know about:\n\n"
        for i, t in enumerate(tests[:10]): # Give it a sample to keep prompt size reasonable
             tests_context += f"- Test {t['testNo']}: {t['name']} (for {t.get('adulterant', 'adulterants')})\n"

        system_instruction += "\n\n" + tests_context

        contents = []
        for msg in history:
            role = "model" if msg["role"] == "assistant" else "user"
            contents.append({
                "role": role,
                "parts": [{"text": msg["content"]}]
            })

        contents.append({
             "role": "user",
             "parts": [{"text": message}]
        })

        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=contents,
            config={'system_instruction': system_instruction}
        )

        return {
            "response": response.text,
            "mode": "gemini_ai"
        }
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return None

def analyze_observation_gemini(observation: str, test_id: Optional[str] = None, test_name: str = "", category: str = "", food_item: str = "") -> Dict[str, Any]:
    if not is_gemini_configured():
        return None

    try:
        system_instruction = (
            "You are an AI assistant that analyzes observations from FSSAI DART food adulteration tests. "
            "You must respond in valid JSON format ONLY, with no other text."
        )

        context = ""
        test_info = None
        if test_id:
            test_info = get_test_by_id(test_id)

        if test_info:
            context = f"The user is performing Test {test_info['testNo']}: {test_info['name']}. "
            context += f"The expected result for pure food is: {test_info.get('pureResult', '')}. "
            context += f"The expected result for adulterated food is: {test_info.get('adulteratedResult', '')}. "
            context += f"The adulterant being checked is: {test_info.get('adulterant', '')}. "
            context += f"The health risk is: {test_info.get('healthRisk', '')}. "
            context += f"The risk level is: {test_info.get('riskLevel', '')}. "
        else:
            context = f"The user is testing {food_item} in the {category} category. Test name mentioned: {test_name}. "

        prompt = (
            f"{context}\n\n"
            f"The user's observation is: \"{observation}\"\n\n"
            "Analyze the observation and determine if the food is adulterated based on the test information. "
            "Return a JSON object with the following schema:\n"
            "{\n"
            '  "result": "string (e.g., \'✅ NOT ADULTERATED\', \'⚠️ ADULTERATED\', or \'🔍 INCONCLUSIVE\')",\n'
            '  "explanation": "string (brief explanation of your conclusion)",\n'
            '  "adulterant": "string (the name of the adulterant, if detected)",\n'
            '  "risk_level": "string (e.g., \'Safe\', \'Low\', \'Medium\', \'High\', \'Critical\')",\n'
            '  "action": "string (recommendation, e.g., \'Report to FSSAI\' if adulterated)"\n'
            "}"
        )

        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config={
                'system_instruction': system_instruction,
                'response_mime_type': 'application/json'
            }
        )

        result_json = json.loads(response.text)
        result_json["mode"] = "gemini_ai"

        return result_json

    except Exception as e:
        print(f"Gemini API Error in analyze: {e}")
        return None
