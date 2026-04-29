import { Link } from "react-router-dom";
import HomeAssistant from "../components/HomeAssistant";

export default function Home() {
  const cards = [
    { icon: "🧪", title: "Quick Tests", desc: "Perform simple at-home tests to detect food adulteration instantly." },
    { icon: "⚠️", title: "Common Adulterants", desc: "Learn about harmful substances commonly found in everyday food items." },
    { icon: "🤝", title: "Take the Pledge", desc: "Join thousands of citizens committed to food safety awareness." },
  ];

  const stats = [
    { value: "44", label: "DART Tests" },
    { value: "7", label: "Food Categories" },
    { value: "100%", label: "Free to Use" },
    { value: "AI", label: "Powered" },
  ];

  return (
    <div>
      {/* Hero Section - matching official dark teal */}
      <div style={{ background: "linear-gradient(135deg, #0d2137 0%, #1a4a6e 50%, #1e6f8e 100%)", minHeight: 380 }}
        className="flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 style={{ color: "white", fontWeight: 900, fontSize: "clamp(28px, 5vw, 48px)", marginBottom: 16 }}>
          Detect Adulteration with Rapid Test
        </h1>
        <p style={{ color: "#b0c4de", fontSize: 18, marginBottom: 32, maxWidth: 600 }}>
          Empowering citizens to ensure food safety through simple at-home tests
        </p>
        <Link
          to="/categories"
          style={{
            background: "white", color: "#0d2137", fontWeight: 700, fontSize: 18,
            padding: "12px 36px", borderRadius: 8, textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: 8,
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
          }}
          className="hover:bg-gray-100 transition-colors"
        >
          Start Testing →
        </Link>
      </div>

      {/* Feature Cards - matching official 3-card layout */}
      <div style={{ background: "#f5f7fa" }} className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <div key={c.title} style={{ background: "white", borderRadius: 12, padding: 28, textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>{c.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: 18, color: "#1e2d5a", marginBottom: 8 }}>{c.title}</h3>
              <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background: "#1e2d5a" }} className="py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{ color: "#FFC107", fontWeight: 900, fontSize: 36 }}>{s.value}</div>
              <div style={{ color: "#93c5fd", fontSize: 14 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* About DART */}
      <div style={{ background: "white" }} className="py-14 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div style={{ color: "#2563eb", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>
              About DART
            </div>
            <h2 style={{ fontWeight: 800, fontSize: 28, color: "#1e2d5a", marginBottom: 16, lineHeight: 1.3 }}>
              What is DART?
            </h2>
            <p style={{ color: "#4b5563", lineHeight: 1.8, marginBottom: 12 }}>
              <strong>DART (Detect Adulteration with Rapid Test)</strong> is an official manual published by
              FSSAI — Food Safety and Standards Authority of India — containing <strong>44 simple tests</strong> that
              can be performed at home using common household items to detect food adulteration.
            </p>
            <p style={{ color: "#4b5563", lineHeight: 1.8, marginBottom: 24 }}>
              These tests cover 7 food categories including milk, oils, spices, cereals, beverages,
              vegetables, and sweets — empowering every citizen to verify food purity.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/categories"
                style={{ background: "#1e2d5a", color: "white", padding: "10px 24px", borderRadius: 6, fontWeight: 600, textDecoration: "none" }}
                className="hover:opacity-90 transition-opacity"
              >
                View All Tests →
              </Link>
              <Link to="/awareness"
                style={{ border: "2px solid #1e2d5a", color: "#1e2d5a", padding: "10px 24px", borderRadius: 6, fontWeight: 600, textDecoration: "none" }}
                className="hover:bg-gray-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Category preview grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "🥛", label: "Milk & Dairy", bg: "#dbeafe", accent: "#1d4ed8" },
              { icon: "🫙", label: "Oils & Fats", bg: "#fef3c7", accent: "#d97706" },
              { icon: "🌶️", label: "Spices", bg: "#fee2e2", accent: "#dc2626" },
              { icon: "🌾", label: "Cereals", bg: "#dcfce7", accent: "#16a34a" },
            ].map((c) => (
              <Link key={c.label} to="/categories"
                style={{ background: c.bg, borderRadius: 12, padding: 20, textAlign: "center", textDecoration: "none" }}
                className="hover:shadow-md transition-shadow"
              >
                <div style={{ fontSize: 36, marginBottom: 8 }}>{c.icon}</div>
                <div style={{ fontWeight: 700, color: c.accent, fontSize: 14 }}>{c.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <HomeAssistant />

      {/* Emergency Contact */}
      <div style={{ background: "#fef2f2", borderTop: "3px solid #ef4444" }} className="py-10 px-4 text-center">
        <h2 style={{ fontWeight: 800, fontSize: 22, color: "#991b1b", marginBottom: 6 }}>
          🚨 Report Adulterated Food to FSSAI
        </h2>
        <p style={{ color: "#b91c1c", marginBottom: 20 }}>If you detect adulteration, report immediately</p>
        <div className="flex flex-wrap gap-4 justify-center">
          {[
            { label: "Toll-Free", value: "1800-11-2100" },
            { label: "WhatsApp", value: "98 6868 6868" },
            { label: "Email", value: "compliance@fssai.gov.in" },
          ].map((c) => (
            <div key={c.label} style={{ background: "white", border: "1px solid #fca5a5", borderRadius: 8, padding: "10px 20px" }}>
              <div style={{ color: "#9ca3af", fontSize: 12 }}>{c.label}</div>
              <div style={{ fontWeight: 700, color: "#dc2626" }}>{c.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
