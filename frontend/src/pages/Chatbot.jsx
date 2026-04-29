import { useState, useRef, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const STATIC_RESPONSES = {
  "what is dart": "🧪 **DART (Detect Adulteration with Rapid Test)** is an official manual by FSSAI containing 44 simple tests to detect food adulteration at home using common household items.",
  "fssai contact": "📞 **FSSAI Contacts:**\n• Toll-Free: **1800-11-2100**\n• WhatsApp: **98 6868 6868**\n• Email: compliance@fssai.gov.in",
  "report": "📞 **Report to FSSAI:**\n• Toll-Free: **1800-11-2100**\n• WhatsApp: **98 6868 6868**\n• Email: compliance@fssai.gov.in\n\nYou can report food adulteration — it is a criminal offence under FSS Act 2006!",
  "milk adulteration": "🥛 **Common milk adulterants:**\n• Water (reduces nutrition)\n• Detergent (causes stomach disorders)\n• Starch (reduces value)\n• Urea (kidney damage)\n\nCheck **Milk & Dairy** category for 4 DART tests!",
  "most dangerous": "🚨 **Most dangerous adulterations in India:**\n1. Argemone seeds in mustard → Epidemic dropsy, heart failure\n2. TOCP in oils → Paralysis\n3. Lead chromate in turmeric → Lead poisoning\n4. Malachite green in vegetables → Cancer\n5. Khesari dal in pulses → Lathyrism (paralysis)",
  "turmeric": "🌿 **Turmeric adulterations:**\n• Lead chromate (toxic, carcinogenic)\n• Artificial yellow colour (metanil yellow)\n\nTest: Add turmeric to water — pure turmeric releases colour slowly, adulterated releases strong yellow immediately.",
  "spices": "🌶️ **Common spice adulterations:**\n• Chilli powder: synthetic dyes, saw dust\n• Turmeric: lead chromate, artificial colour\n• Black pepper: papaya seeds\n• Cumin: charcoal-dusted grass seeds\n• Cinnamon: cassia bark",
  "default": "I'm the FSSAI DART Food Safety Assistant! I can help with:\n\n🧪 **Testing** — How to detect adulteration\n⚕️ **Health risks** — Effects of adulterants\n📢 **Reporting** — How to report to FSSAI\n📚 **Learning** — About food safety\n\nTry asking: *'How to test milk?'* or *'Is lead chromate dangerous?'* or *'How to report adulteration?'*"
};

function getStaticResponse(message) {
  const msg = message.toLowerCase();
  for (const [key, response] of Object.entries(STATIC_RESPONSES)) {
    if (key !== "default" && msg.includes(key)) return response;
  }
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "👋 Hello! I'm the FSSAI DART Food Safety Assistant. How can I help you today? Ask me about food safety, testing methods, or health risks of adulterants!";
  }
  return STATIC_RESPONSES["default"];
}

function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>");
}

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hello! I'm the **FSSAI DART Food Safety Assistant**.\n\nI can help you:\n• 🧪 Understand DART testing procedures\n• ⚕️ Know health risks of food adulterants\n• 📢 Guide you on reporting adulterated food\n• 📚 Spread food safety awareness\n\nHow can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiMode, setApiMode] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Check API mode
    axios.get(`${API_BASE}/health`).then(res => {
      setApiMode(res.data.mode);
    }).catch(() => setApiMode("offline"));
  }, []);

  const quickQuestions = [
    "What is DART?",
    "Most dangerous adulterations?",
    "How to test milk?",
    "How to report to FSSAI?",
    "What is lead chromate?",
    "Common spice adulterations?",
  ];

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");

    const newMessages = [...messages, { role: "user", content: msg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/chat`, {
        message: msg,
        history: newMessages.slice(-6).map(m => ({ role: m.role, content: m.content })),
      });
      setMessages([...newMessages, { role: "assistant", content: res.data.response, mode: res.data.mode }]);
      setApiMode(res.data.mode);
    } catch {
      // Offline fallback
      const response = getStaticResponse(msg);
      setMessages([...newMessages, { role: "assistant", content: response, mode: "offline" }]);
      setApiMode("offline");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">🤖 DART AI Food Safety Assistant</h1>
        <p className="text-gray-500 text-sm mt-1">Ask anything about food adulteration, testing methods, or health risks</p>
        {apiMode && (
          <span className={`inline-block mt-2 text-xs px-3 py-1 rounded-full ${
            apiMode === "anthropic_ai" ? "bg-green-100 text-green-700" :
            apiMode === "offline" ? "bg-gray-100 text-gray-600" :
            apiMode === "dataset_agent" ? "bg-green-100 text-green-700" :
            "bg-yellow-100 text-yellow-700"
          }`}>
            {apiMode === "anthropic_ai" ? "🟢 Claude AI Active" :
             apiMode === "offline" ? "🔴 Offline Mode" :
             apiMode === "dataset_agent" ? "Dataset Agent Active" :
             "🟡 Static Mode"}
          </span>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden">
        {/* Messages */}
        <div className="h-[480px] overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm flex-shrink-0 mr-2 mt-1">
                  🤖
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-green-600 text-white rounded-tr-sm"
                    : "bg-gray-100 text-gray-800 rounded-tl-sm"
                }`}
              >
                {msg.role === "assistant" ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                  />
                ) : (
                  msg.content
                )}
                {msg.mode && msg.role === "assistant" && (
                  <div className={`text-xs mt-1 ${msg.role === "user" ? "text-green-200" : "text-gray-400"}`}>
                    {msg.mode === "ai" ? "🤖 Claude AI" : msg.mode === "dataset_agent" ? "Dataset Agent" : msg.mode === "offline" ? "📋 Offline" : "📋 Static"}
                  </div>
                )}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm flex-shrink-0 ml-2 mt-1">
                  👤
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm flex-shrink-0 mr-2">
                🤖
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick questions */}
        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="flex-shrink-0 text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:border-green-400 hover:text-green-700 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Ask about food safety, adulterants, or DART tests..."
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="bg-green-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              Send
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            {apiMode === "offline"
              ? "⚡ Running in offline mode. Start the FastAPI backend for AI-powered responses."
              : " Ask about any food safety concern!"}
          </p>
        </div>
      </div>
    </div>
  );
}
