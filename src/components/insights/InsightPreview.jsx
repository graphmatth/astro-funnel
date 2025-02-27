export default function InsightPreview({ insights, interestArea }) {
  // Map interest area to emoji and title
  const areaInfo = {
    love: { emoji: '❤️', title: 'Love & Relationships' },
    career: { emoji: '💼', title: 'Career & Finance' },
    health: { emoji: '🧘', title: 'Health & Wellness' },
    personal: { emoji: '🌱', title: 'Personal Growth' },
    family: { emoji: '🏠', title: 'Family & Home' },
  }[interestArea] || { emoji: '✨', title: 'Cosmic Insights' };


  // Only show a preview - limited content
  const previewText = insights.text.split(' ').slice(0, 20).join(' ') + '...';


  return (
    <div 
      className="bg-gradient-to-b from-indigo-50 to-purple-50 p-6 rounded-xl shadow-sm"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">{areaInfo.emoji} {areaInfo.title}</h3>
        <div className="text-sm px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
          Preview
        </div>
      </div>
      
      <div className="space-y-4">
        {insights.sign && (
          <div className="flex items-center">
            <span className="text-2xl mr-2">{insights.sign.emoji}</span>
            <div>
              <p className="font-medium">{insights.sign.name}</p>
              <p className="text-sm text-gray-600">{insights.sign.dates}</p>
            </div>
          </div>
        )}
        
        <div className="prose prose-sm max-w-none">
          <p>{previewText}</p>
        </div>
        
        {insights.keywords && (
          <div className="pt-2 blur-sm">
            <p className="text-sm text-gray-500 mb-1">Key Themes:</p>
            <div className="flex flex-wrap gap-2">
              {insights.keywords.slice(0, 3).map((keyword, i) => (
                <span 
                  key={i}
                  className="text-xs px-2 py-1 bg-white/80 text-purple-700 rounded-full"
                >
                  {keyword}
                </span>
              ))}
              {insights.keywords.length > 3 && (
                <span className="text-xs px-2 py-1 bg-white/80 text-purple-700 rounded-full">
                  +{insights.keywords.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}