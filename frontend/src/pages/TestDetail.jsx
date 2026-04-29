import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { getTestById, categories, tests as allTests } from "../data/dartTests";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const riskConfig = {
  Safe: { bg: "bg-green-50", border: "border-green-300", text: "text-green-800", badge: "bg-green-100 text-green-800", icon: "✅" },
  Low: { bg: "bg-blue-50", border: "border-blue-300", text: "text-blue-800", badge: "bg-blue-100 text-blue-800", icon: "ℹ️" },
  Medium: { bg: "bg-yellow-50", border: "border-yellow-400", text: "text-yellow-800", badge: "bg-yellow-100 text-yellow-800", icon: "⚠️" },
  High: { bg: "bg-orange-50", border: "border-orange-400", text: "text-orange-800", badge: "bg-orange-100 text-orange-800", icon: "🔶" },
  Critical: { bg: "bg-red-50", border: "border-red-400", text: "text-red-800", badge: "bg-red-100 text-red-800", icon: "🚨" },
  "CRITICAL - DO NOT CONSUME": { bg: "bg-red-50", border: "border-red-500", text: "text-red-900", badge: "bg-red-600 text-white", icon: "🚨" },
};

export default function TestDetail() {
  const { testId } = useParams();
  const [observation, setObservation] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Find test
  const test = getTestById(testId);
  if (!test) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-xl font-bold text-gray-700">Test not found</h2>
        <Link to="/categories" className="text-green-600 mt-4 inline-block">← Back to Categories</Link>
      </div>
    );
  }

  // Find category
  const category = categories.find((c) => allTests[c.id]?.some((t) => t.id === testId)) || {};

  const risk = test.riskLevel || "Medium";
  const rc = riskConfig[risk] || riskConfig["Medium"];

  const handleSubmit = async () => {
    if (!observation.trim()) {
      setError("Please enter your observation before submitting.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post(`${API_BASE}/analyze`, {
        test_id: test.id,
        test_name: test.name,
        category: category.name || "",
        observation: observation,
        food_item: test.adulterant,
      });
      setResult(res.data);
    } catch (err) {
      // If backend is not running, use client-side static logic
      const staticResult = getClientSideResult(test, observation);
      setResult(staticResult);
    } finally {
      setLoading(false);
    }
  };

  const getResultConfig = (r) => {
    if (!r) return riskConfig["Medium"];
    const level = r.risk_level || "Medium";
    return riskConfig[level] || riskConfig["Medium"];
  };

  const resultRc = result ? getResultConfig(result) : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6 flex items-center gap-2 flex-wrap">
        <Link to="/categories" className="hover:text-green-600">Categories</Link>
        <span>›</span>
        {category.id && (
          <>
            <Link to={`/category/${category.id}`} className="hover:text-green-600">{category.name}</Link>
            <span>›</span>
          </>
        )}
        <span className="text-gray-800 font-medium truncate">{test.name}</span>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left: Test info */}
        <div className="md:col-span-2 space-y-5">
          {/* Test Header */}
          <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-sm font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
                TEST {test.testNo}
              </span>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${rc.badge}`}>
                {rc.icon} Risk: {risk}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{test.name}</h1>
            <div className="text-sm text-gray-500">
              <span className="font-medium">Detects: </span>
              <span className="text-red-600 font-medium">{test.adulterant}</span>
            </div>
          </div>

          {/* Procedure */}
          <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">🔬 Testing Procedure</h2>
            <ol className="space-y-3">
              {test.procedure.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-gray-700 text-sm leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* What to expect */}
          <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Expected Results</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                  <span>✅</span> Pure / Not Adulterated
                </div>
                <p className="text-green-800 text-sm">{test.pureResult}</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                  <span>⚠️</span> Adulterated
                </div>
                <p className="text-red-800 text-sm">{test.adulteratedResult}</p>
              </div>
            </div>
          </div>

          {/* Video placeholder */}
          <div className="bg-gray-900 rounded-xl p-8 text-center">
            <div className="text-5xl mb-3">▶️</div>
            <h3 className="text-white font-semibold mb-1">Video Demonstration</h3>
            <p className="text-gray-400 text-sm">Video will be available soon</p>
            <div className="mt-3 text-xs text-gray-500 bg-gray-800 rounded px-3 py-1 inline-block">
              Placeholder — YouTube embed will be added here
            </div>
          </div>

          {/* Observation Input */}
          <div className="bg-white rounded-xl shadow border-2 border-green-300 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-2">📝 Enter Your Observation</h2>
            <p className="text-gray-500 text-sm mb-4">
              After performing the test, describe exactly what you observed.
            </p>
            <textarea
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              placeholder={`Example: "${test.pureResult}" or "${test.adulteratedResult}"`}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 resize-none"
              rows={4}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-4 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-60 transition-colors w-full"
            >
              {loading ? "🔄 Analyzing with AI..." : "🤖 Submit to AI for Analysis"}
            </button>
          </div>

          {/* Result */}
          {result && (
            <div className={`rounded-xl border-2 p-6 ${resultRc?.bg || "bg-gray-50"} ${resultRc?.border || "border-gray-300"}`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{resultRc?.icon}</span>
                <div>
                  <h2 className={`text-xl font-bold ${resultRc?.text || "text-gray-800"}`}>{result.result}</h2>
                  {result.mode && (
                    <span className="text-xs text-gray-400">
                      {result.mode === "ai" ? "🤖 AI Analysis" : result.mode === "static" ? "📋 Rule-based" : "Analysis"}
                    </span>
                  )}
                </div>
              </div>

              {result.adulterant && (
                <div className="mb-3">
                  <span className="text-sm font-medium text-gray-600">Adulterant Detected: </span>
                  <span className="text-sm font-bold text-red-700">{result.adulterant}</span>
                </div>
              )}

              {result.explanation && (
                <p className={`text-sm mb-4 ${resultRc?.text || "text-gray-700"}`}>{result.explanation}</p>
              )}

              {result.health_effects && result.health_effects.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700 mb-2">⚕️ Health Effects:</h3>
                  <ul className="space-y-1">
                    {result.health_effects.map((effect, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-700">
                        <span className="text-red-500 flex-shrink-0">•</span>
                        {effect}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.action && (
                <div className="bg-white bg-opacity-70 rounded-lg p-3 mt-3">
                  <span className="text-sm font-semibold text-gray-700">📢 Recommended Action: </span>
                  <span className="text-sm text-gray-700">{result.action}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-5">
          {/* Health Risk Card */}
          <div className={`rounded-xl border p-4 ${rc.bg} ${rc.border}`}>
            <h3 className={`font-bold mb-2 ${rc.text}`}>⚕️ Health Risk Info</h3>
            <p className={`text-sm ${rc.text}`}>{test.healthRisk}</p>
            <div className={`mt-3 inline-block px-3 py-1 rounded-full text-xs font-semibold ${rc.badge}`}>
              {rc.icon} Risk Level: {risk}
            </div>
          </div>

          {/* Quick tips */}
          <div className="bg-white rounded-xl shadow border border-gray-100 p-4">
            <h3 className="font-bold text-gray-800 mb-3">💡 Test Tips</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2"><span>•</span>Use clean glass/containers</li>
              <li className="flex gap-2"><span>•</span>Use fresh samples for testing</li>
              <li className="flex gap-2"><span>•</span>Observe under good lighting</li>
              <li className="flex gap-2"><span>•</span>Repeat test if uncertain</li>
              <li className="flex gap-2"><span>•</span>Compare with a known pure sample</li>
            </ul>
          </div>

          {/* Report FSSAI */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <h3 className="font-bold text-red-800 mb-2">🚨 Found Adulteration?</h3>
            <p className="text-red-700 text-sm mb-3">Report immediately to FSSAI:</p>
            <div className="space-y-2 text-sm">
              <div className="bg-white rounded p-2 border border-red-200">
                <div className="text-gray-500 text-xs">Toll-Free</div>
                <div className="font-bold text-red-700">1800-11-2100</div>
              </div>
              <div className="bg-white rounded p-2 border border-red-200">
                <div className="text-gray-500 text-xs">WhatsApp</div>
                <div className="font-bold text-red-700">98 6868 6868</div>
              </div>
            </div>
          </div>

          {/* Ask AI button */}
          <Link
            to="/chatbot"
            className="block bg-green-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            🤖 Ask AI Assistant
          </Link>
        </div>
      </div>
    </div>
  );
}

// Client-side fallback when backend is down
function getClientSideResult(test, observation) {
  const obs = observation.toLowerCase();
  const isAdulterated = test.keywords?.some(k => obs.includes(k.toLowerCase()));
  
  if (isAdulterated) {
    return {
      result: "⚠️ ADULTERATED (Offline Analysis)",
      adulterant: test.adulterant,
      explanation: `Based on your observation and DART test guidelines, your food may contain ${test.adulterant}. ${test.adulteratedResult}`,
      health_effects: [test.healthRisk],
      risk_level: test.riskLevel || "High",
      action: "Report to FSSAI at 1800-11-2100. For full AI analysis, start the backend server.",
      mode: "offline"
    };
  }
  
  // Check if observation mentions pure results
  const isPure = obs.includes("no") || obs.includes("pure") || obs.includes("clean") || obs.includes("normal");
  if (isPure) {
    return {
      result: "✅ NOT ADULTERATED (Offline Analysis)",
      explanation: test.pureResult,
      risk_level: "Safe",
      mode: "offline"
    };
  }
  
  return {
    result: "🔍 ANALYSIS INCOMPLETE",
    explanation: "Please be more specific about your observation. Start the backend server for full AI-powered analysis.",
    risk_level: "Unknown",
    mode: "offline"
  };
}
