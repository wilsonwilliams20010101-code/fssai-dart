import { Link, useParams } from "react-router-dom";
import { tests, getCategoryById } from "../data/dartTests";

export default function TestList() {
  const { categoryId } = useParams();
  const category = getCategoryById(categoryId);
  const categoryTests = tests[categoryId] || [];

  if (!category) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">❌</div>
        <h2 className="text-xl font-bold text-gray-700">Category not found</h2>
        <Link to="/categories" className="text-green-600 mt-4 inline-block">← Back to Categories</Link>
      </div>
    );
  }

  const riskColor = { Safe: "green", Low: "blue", Medium: "yellow", High: "orange", Critical: "red" };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link to="/categories" className="hover:text-green-600 transition-colors">Categories</Link>
        <span>›</span>
        <span className="text-gray-800 font-medium">{category.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="text-5xl p-3 rounded-2xl" style={{ background: category.color }}>
          {category.icon}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{category.name}</h1>
          <p className="text-gray-500 mt-1">{category.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-white text-xs px-3 py-1 rounded-full font-semibold" style={{ background: category.accent }}>
              {categoryTests.length} Available Tests
            </span>
          </div>
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {categoryTests.map((test) => {
          const risk = test.riskLevel || "Medium";
          const riskColors = {
            Safe: "bg-green-100 text-green-800",
            Low: "bg-blue-100 text-blue-800",
            Medium: "bg-yellow-100 text-yellow-800",
            High: "bg-orange-100 text-orange-800",
            Critical: "bg-red-100 text-red-800",
          };
          const borderColors = {
            Safe: "border-green-200",
            Low: "border-blue-200",
            Medium: "border-yellow-200",
            High: "border-orange-300",
            Critical: "border-red-300",
          };

          return (
            <Link
              key={test.id}
              to={`/test/${test.id}`}
              className={`group bg-white rounded-xl shadow border ${borderColors[risk] || "border-gray-200"} hover:shadow-md transition-all p-5`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                    TEST {test.testNo}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${riskColors[risk]}`}>
                    {risk === "Critical" ? "🚨 " : risk === "High" ? "⚠️ " : ""}Risk: {risk}
                  </span>
                </div>
              </div>

              <h3 className="font-bold text-gray-800 text-base mb-2 group-hover:text-green-700 transition-colors">
                {test.name}
              </h3>

              <div className="mb-3">
                <span className="text-xs text-gray-500">Detects adulterant: </span>
                <span className="text-xs font-medium text-gray-700">{test.adulterant}</span>
              </div>

              <div className="text-xs text-gray-500 mb-4 line-clamp-2">
                {test.procedure[0]}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-400">
                  {test.procedure.length} steps
                </div>
                <span className="text-green-600 text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">
                  Run Test →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
