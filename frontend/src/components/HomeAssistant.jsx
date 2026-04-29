import { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const quickQuestions = [
  "How to test milk?",
  "What is lead chromate?",
  "Most dangerous adulterations?",
  "How to report adulteration?",
];

const fallbackAnswer =
  "I can help with DART test procedures, adulteration clues, health risks, and FSSAI reporting. Start the FastAPI backend for the full dataset-powered assistant.";

function formatMessage(text) {
  return (text || "")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>");
}

export default function HomeAssistant() {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState(
    "Ask about any DART test, adulterant, observation, health risk, or FSSAI reporting."
  );
  const [loading, setLoading] = useState(false);

  const askAssistant = async (text) => {
    const message = (text || input).trim();
    if (!message || loading) return;

    setInput("");
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/chat`, { message, history: [] });
      setAnswer(res.data.response || fallbackAnswer);
    } catch {
      setAnswer(fallbackAnswer);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ background: "#eef7f1" }} className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-8 items-stretch">
          <div className="flex flex-col justify-center">
            <div style={{ color: "#15803d", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>
              Food Safety Assistant
            </div>
            <h2 style={{ fontWeight: 800, fontSize: 28, color: "#163b2a", lineHeight: 1.25, marginBottom: 12 }}>
              Ask before you consume
            </h2>
            <p style={{ color: "#466155", lineHeight: 1.7 }}>
              Get quick guidance from the DART knowledge base for test steps, visible clues,
              health risks, and reporting contacts.
            </p>
          </div>

          <div className="bg-white border border-green-100 shadow-sm rounded-xl p-4">
            <div className="min-h-[132px] max-h-56 overflow-y-auto rounded-lg bg-gray-50 border border-gray-100 p-4 text-sm leading-relaxed text-gray-700">
              {loading ? (
                <div className="flex items-center gap-2 text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: "120ms" }} />
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: "240ms" }} />
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: formatMessage(answer) }} />
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto py-3">
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => askAssistant(question)}
                  className="flex-shrink-0 text-xs bg-green-50 border border-green-200 text-green-800 px-3 py-1.5 rounded-full hover:bg-green-100 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && askAssistant()}
                placeholder="Ask about milk, turmeric, tea, oils, reporting..."
                className="flex-1 min-w-0 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
              <button
                type="button"
                onClick={() => askAssistant()}
                disabled={loading || !input.trim()}
                className="bg-green-700 text-white px-5 py-3 rounded-lg font-semibold hover:bg-green-800 disabled:opacity-50 transition-colors"
              >
                Ask
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
