export default function Awareness() {
  const adulterants = [
    { food: "Milk", adulterant: "Water, Detergent, Starch, Urea", risk: "High", icon: "🥛" },
    { food: "Turmeric", adulterant: "Lead chromate, Metanil yellow", risk: "Critical", icon: "🌿" },
    { food: "Mustard oil", adulterant: "Argemone oil", risk: "Critical", icon: "🫙" },
    { food: "Chilli powder", adulterant: "Sudan dye, Rhodamine B, brick dust", risk: "Critical", icon: "🌶️" },
    { food: "Honey", adulterant: "Sugar syrup, glucose", risk: "High", icon: "🍯" },
    { food: "Black pepper", adulterant: "Papaya seeds, light berries", risk: "High", icon: "🌑" },
    { food: "Ghee", adulterant: "Vanaspati, starch", risk: "Medium", icon: "🫕" },
    { food: "Coffee", adulterant: "Chicory, clay", risk: "Medium", icon: "☕" },
    { food: "Tea", adulterant: "Iron filings, coal tar colour", risk: "High", icon: "🍵" },
    { food: "Green vegetables", adulterant: "Malachite green", risk: "Critical", icon: "🥦" },
  ];

  const healthRisks = [
    { icon: "🧠", title: "Neurological Damage", desc: "Lead chromate, argemone oil, and TOCP cause irreversible nerve damage and paralysis." },
    { icon: "🫀", title: "Heart & Organ Failure", desc: "Epidemic dropsy from argemone seeds leads to heart enlargement and failure." },
    { icon: "🦠", title: "Cancer Risk", desc: "Malachite green, Rhodamine B, and Sudan dyes are known carcinogens banned in food." },
    { icon: "👶", title: "Child Development", desc: "Lead poisoning from adulterated turmeric severely impacts brain development in children." },
    { icon: "🩺", title: "Liver & Kidney", desc: "Industrial dyes and chemical adulterants accumulate and damage vital organs over time." },
    { icon: "⚡", title: "Immediate Effects", desc: "Detergent in milk causes vomiting, diarrhea, and stomach cramps — especially dangerous for infants." },
  ];

  const prevention = [
    { tip: "Always buy food from FSSAI-licensed shops and verify the FSSAI mark on packaging." },
    { tip: "Perform simple DART tests at home before consuming — especially for milk, spices, and oils." },
    { tip: "Avoid buying spices and food items from loose/unbranded sources." },
    { tip: "Bright, unnaturally vibrant coloured spices like turmeric may be artificially coloured." },
    { tip: "Prefer whole spices over powders — harder to adulterate." },
    { tip: "Report suspicious food to FSSAI immediately — protecting community health is everyone's responsibility." },
    { tip: "Store food properly to prevent contamination after purchase." },
    { tip: "Be skeptical of food products sold at unusually low prices." },
  ];

  const riskBadge = {
    Critical: "bg-red-100 text-red-800 border border-red-200",
    High: "bg-orange-100 text-orange-800 border border-orange-200",
    Medium: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="text-green-600 font-semibold text-sm uppercase tracking-wide mb-2">Food Safety Awareness</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Know Your Food. Stay Safe.</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Food adulteration is a serious public health issue in India. Understanding common adulterants,
          their health risks, and prevention tips empowers you to protect your family.
        </p>
      </div>

      {/* What is Food Adulteration */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🧪 What is Food Adulteration?</h2>
        <p className="text-gray-700 mb-4">
          Food adulteration is the process of adding inferior, harmful, or non-food substances to food items
          with the intent to increase profit or deceive consumers. It reduces the quality and nutritional value
          of food, and in many cases, poses serious health hazards.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { type: "Intentional", desc: "Adding harmful substances deliberately for profit. E.g., lead chromate in turmeric.", color: "bg-red-100 text-red-800" },
            { type: "Incidental", desc: "Contamination during storage, processing, or packaging. E.g., pesticide residues.", color: "bg-yellow-100 text-yellow-800" },
            { type: "Metallic", desc: "Heavy metal contamination from environment or packaging. E.g., mercury, lead.", color: "bg-orange-100 text-orange-800" },
          ].map((t) => (
            <div key={t.type} className="bg-white rounded-xl p-4 shadow-sm">
              <div className={`inline-block px-2 py-0.5 rounded text-xs font-semibold mb-2 ${t.color}`}>{t.type}</div>
              <p className="text-gray-600 text-sm">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Common Adulterants */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">⚠️ Common Food Adulterants in India</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {adulterants.map((a) => (
            <div key={a.food} className="bg-white rounded-xl border border-gray-200 p-4 flex items-start gap-3 hover:shadow-md transition-all">
              <span className="text-3xl flex-shrink-0">{a.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-800">{a.food}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${riskBadge[a.risk]}`}>
                    {a.risk}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  <span className="text-red-600 font-medium">Adulterants: </span>{a.adulterant}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Health Risks */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">⚕️ Health Risks of Food Adulteration</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {healthRisks.map((h) => (
            <div key={h.title} className="bg-white rounded-xl shadow border border-gray-100 p-5">
              <div className="text-3xl mb-3">{h.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2">{h.title}</h3>
              <p className="text-gray-500 text-sm">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FSSAI Laws */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">⚖️ Legal Framework</h2>
        <p className="text-gray-700 mb-4">
          Food adulteration is a criminal offence in India under the{" "}
          <strong>Food Safety and Standards Act, 2006 (FSS Act)</strong>.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { offense: "Selling adulterated food", penalty: "Up to ₹10 lakh fine", icon: "💰" },
            { offense: "Adulteration causing injury", penalty: "Up to 6 years imprisonment", icon: "⚖️" },
            { offense: "Adulteration causing death", penalty: "Up to life imprisonment", icon: "🚨" },
          ].map((l) => (
            <div key={l.offense} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-2xl mb-2">{l.icon}</div>
              <div className="font-medium text-gray-700 text-sm mb-1">{l.offense}</div>
              <div className="font-bold text-blue-700 text-sm">{l.penalty}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Prevention Tips */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🛡️ Prevention Tips</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {prevention.map((p, i) => (
            <div key={i} className="flex gap-3 bg-white rounded-xl border border-gray-100 p-4 hover:shadow-sm transition-all">
              <div className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                {i + 1}
              </div>
              <p className="text-gray-700 text-sm">{p.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FSSAI Contact */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">🤝 FSSAI Food Safety Connect</h2>
        <p className="text-green-200 mb-6">Report adulterated food, raise complaints, stay informed</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Toll-Free", value: "1800-11-2100", icon: "📞" },
            { label: "WhatsApp", value: "98 6868 6868", icon: "💬" },
            { label: "SMS", value: "98 6868 6868", icon: "📱" },
            { label: "Email", value: "compliance@fssai.gov.in", icon: "📧" },
          ].map((c) => (
            <div key={c.label} className="bg-white bg-opacity-10 rounded-xl p-3">
              <div className="text-2xl mb-1">{c.icon}</div>
              <div className="text-green-200 text-xs">{c.label}</div>
              <div className="font-bold text-sm">{c.value}</div>
            </div>
          ))}
        </div>
        <p className="text-green-200 text-sm mt-4">
          Website: <span className="text-white font-medium">www.fssai.gov.in</span>
        </p>
      </div>
    </div>
  );
}
