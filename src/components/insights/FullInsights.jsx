import { useState } from "react";

// Mapping for interest areas
const areaInfo = {
  love: {
    emoji: "❤️",
    title: "Love & Relationships",
    icon: "👩‍❤️‍👨",
  },
  career: {
    emoji: "💼",
    title: "Career & Finance",
    icon: "📈",
  },
  health: {
    emoji: "🧘",
    title: "Health & Wellness",
    icon: "🌿",
  },
  personal: {
    emoji: "🌱",
    title: "Personal Growth",
    icon: "🌟",
  },
  family: {
    emoji: "🏠",
    title: "Family & Home",
    icon: "👨‍👩‍👧‍👦",
  },
};

const defaultInfo = { emoji: "✨", title: "Cosmic Insights", icon: "🔮" };

export default function FullInsights({ report, interestArea }) {
  const [activeSection, setActiveSection] = useState("overview");
  const info = areaInfo[interestArea] || defaultInfo;

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Sections for the report
  const sections = [
    { id: "overview", label: "Overview", icon: "🌌" },
    { id: "planets", label: "Planetary Influences", icon: "🪐" },
    { id: "houses", label: "Astrological Houses", icon: "🏛️" },
    { id: "aspects", label: "Key Aspects", icon: "⚡" },
    { id: "forecast", label: "Future Forecast", icon: "🔮" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 text-white">
        <div className="flex items-center">
          <span className="text-3xl mr-3">{info.icon}</span>
          <div>
            <h2 className="text-xl font-semibold">{info.title} Analysis</h2>
            <p className="text-indigo-100 text-sm">
              Based on your cosmic signature
            </p>
          </div>
        </div>
      </div>

      <nav className="p-4 border-b overflow-x-auto">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleSectionChange(section.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full mr-2 text-sm font-medium ${
              activeSection === section.id
                ? "bg-purple-100 text-purple-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span className="mr-1">{section.icon}</span> {section.label}
          </button>
        ))}
      </nav>

      <div className="p-6">
        {activeSection === "overview" && (
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-medium mb-1">
                  Your Cosmic Overview
                </h3>
                <p className="text-gray-600 text-sm">
                  A holistic view of your astrological profile
                </p>
              </div>

              {report.sign && (
                <div className="text-center">
                  <div className="text-4xl mb-1">{report.sign.emoji}</div>
                  <div className="text-sm font-medium">{report.sign.name}</div>
                </div>
              )}
            </div>

            <div className="prose max-w-none">
              {report.overview?.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}

        {activeSection === "planets" && (
          <div>
            <h3 className="text-xl font-medium mb-4">
              Planetary Influences in Your Chart
            </h3>

            <div className="space-y-6">
              {report.planets?.map((planet) => (
                <div key={planet.name} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{planet.symbol}</span>
                    <h4 className="text-lg font-medium">{planet.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Position:</span> {planet.sign}{" "}
                    ({planet.degree}°)
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">House:</span> {planet.house}
                  </p>
                  <p>{planet.interpretation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "houses" && (
          <div>
            <h3 className="text-xl font-medium mb-4">
              Your Astrological Houses
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              {report.houses?.map((house) => (
                <div key={house.number} className="border rounded-lg p-4">
                  <h4 className="font-medium mb-1">
                    House {house.number}: {house.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Sign: {house.sign}
                  </p>
                  <p className="text-sm">{house.interpretation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "aspects" && (
          <div>
            <h3 className="text-xl font-medium mb-4">
              Key Aspects in Your Chart
            </h3>

            <div className="space-y-4">
              {report.aspects?.map((aspect, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 border-l-4 border-indigo-300 pl-4 py-3"
                >
                  <h4 className="font-medium mb-1">
                    {aspect.planet1} {aspect.type} {aspect.planet2}
                  </h4>
                  <p className="text-sm text-gray-600 mb-1">
                    Strength: {aspect.strength}° (
                    {aspect.influence === "strong"
                      ? "Strong"
                      : aspect.influence === "moderate"
                        ? "Moderate"
                        : "Weak"}
                    )
                  </p>
                  <p>{aspect.interpretation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "forecast" && (
          <div>
            <h3 className="text-xl font-medium mb-4">Your Cosmic Forecast</h3>

            <div className="space-y-6">
              {report.forecast?.map((period, idx) => (
                <div key={idx} className="border-b pb-4 last:border-0">
                  <h4 className="font-medium mb-2">{period.timeframe}</h4>
                  <div className="flex items-center mb-3">
                    <div className="flex mr-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">
                          {i < period.intensity ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">
                      {period.intensity <= 2
                        ? "Low Energy"
                        : period.intensity <= 3
                          ? "Moderate Energy"
                          : "High Energy"}
                    </div>
                  </div>
                  <p>{period.prediction}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
