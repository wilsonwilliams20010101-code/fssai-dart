import { Link } from "react-router-dom";
import { categories, tests } from "../data/dartTests";

const catConfig = {
  "milk-dairy":       { bg: "#dbeafe", iconColor: "#1d4ed8", svgPath: "M12 2C8 2 5 5 5 9v11h14V9c0-4-3-7-7-7zm-4 16V9c0-2.2 1.8-4 4-4s4 1.8 4 4v9H8z" },
  "oils-fats":        { bg: "#fef3c7", iconColor: "#d97706", svgPath: "M18 6h-2V4h-2v2H8V4H6v2H4v2h16V6zm-1 3H5l1 13h10l1-13z" },
  "sweets-sugar":     { bg: "#f3e8ff", iconColor: "#7c3aed", svgPath: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" },
  "cereals-pulses":   { bg: "#dcfce7", iconColor: "#15803d", svgPath: "M17 8C8 10 5.9 16.17 3.82 21L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-8 2l3-3H8s-5 3-4 8c1 4.5 5.5 5 5.5 5S7 20 12 20c5 0 10-7 10-15" },
  "spices":           { bg: "#ffedd5", iconColor: "#ea580c", svgPath: "M12 2C9.24 2 7 4.24 7 7c0 1.65.81 3.1 2.05 4H8c-1.1 0-2 .9-2 2v1c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-1c0-1.1-.9-2-2-2h-1.05C16.19 10.1 17 8.65 17 7c0-2.76-2.24-5-5-5zm0 9c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zm1 4v5.5l-1 1-1-1V15h2z" },
  "vegetables-fruits":{ bg: "#f0fdf4", iconColor: "#16a34a", svgPath: "M17 8C8 10 5.9 16.17 3.82 21L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-8 2l3-3H8s-5 3-4 8c1 4.5 5.5 5 5.5 5S7 20 12 20c5 0 10-7 10-15" },
  "beverages":        { bg: "#fce7f3", iconColor: "#be185d", svgPath: "M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" },
};

export default function Categories() {
  return (
    <div style={{ background: "#f5f7fa", minHeight: "100vh" }}>
      {/* Page header */}
      <div style={{ background: "white", borderBottom: "1px solid #e5e7eb" }} className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 style={{ fontWeight: 800, fontSize: 28, color: "#1e2d5a", marginBottom: 4 }}>
            Common Food Adulterants
          </h1>
          <div style={{ width: 60, height: 3, background: "#2563eb", marginBottom: 12 }} />
          <p style={{ color: "#6b7280", fontSize: 15 }}>
            Click on any category below to view detailed information about common adulterants and detection methods.
          </p>
        </div>
      </div>

      {/* Category grid */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {categories.map((cat) => {
            const conf = catConfig[cat.id] || { bg: "#f3f4f6", iconColor: "#374151" };
            const catTests = tests[cat.id] || [];
            return (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                style={{
                  background: conf.bg,
                  borderRadius: 14,
                  padding: "28px 20px",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "block",
                  transition: "transform 0.15s, box-shadow 0.15s",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
                }}
                className="hover:shadow-lg hover:-translate-y-1"
              >
                {/* Icon */}
                <div style={{ marginBottom: 14 }}>
                  <svg width="56" height="56" viewBox="0 0 24 24" fill={conf.iconColor} style={{ margin: "0 auto" }}>
                    <path d={conf.svgPath} />
                  </svg>
                </div>
                <div style={{ fontWeight: 700, color: conf.iconColor, fontSize: 15, lineHeight: 1.3, marginBottom: 8 }}>
                  {cat.name}
                </div>
                <div style={{ color: "#6b7280", fontSize: 13 }}>
                  {catTests.length} test methods available
                </div>
              </Link>
            );
          })}
        </div>

        {/* Total count */}
        <div className="mt-10 text-center">
          <div style={{ display: "inline-block", background: "white", border: "1px solid #d1d5db", borderRadius: 10, padding: "12px 24px" }}>
            <span style={{ color: "#1e2d5a", fontWeight: 600 }}>
              Total: <strong>44 DART Tests</strong> across 7 food categories — all from the official FSSAI DART manual
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
