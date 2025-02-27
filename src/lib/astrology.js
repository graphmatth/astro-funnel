// Zodiac sign data
const zodiacSigns = [
    { name: 'Aries', dates: 'March 21 - April 19', emoji: '♈' },
    { name: 'Taurus', dates: 'April 20 - May 20', emoji: '♉' },
    { name: 'Gemini', dates: 'May 21 - June 20', emoji: '♊' },
    { name: 'Cancer', dates: 'June 21 - July 22', emoji: '♋' },
    { name: 'Leo', dates: 'July 23 - August 22', emoji: '♌' },
    { name: 'Virgo', dates: 'August 23 - September 22', emoji: '♍' },
    { name: 'Libra', dates: 'September 23 - October 22', emoji: '♎' },
    { name: 'Scorpio', dates: 'October 23 - November 21', emoji: '♏' },
    { name: 'Sagittarius', dates: 'November 22 - December 21', emoji: '♐' },
    { name: 'Capricorn', dates: 'December 22 - January 19', emoji: '♑' },
    { name: 'Aquarius', dates: 'January 20 - February 18', emoji: '♒' },
    { name: 'Pisces', dates: 'February 19 - March 20', emoji: '♓' },
  ];
  
  // Determine zodiac sign from birth date
  function getZodiacSign(birthDate) {
    const date = new Date(birthDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // JavaScript months are 0-based
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return zodiacSigns[0]; // Aries
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return zodiacSigns[1]; // Taurus
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return zodiacSigns[2]; // Gemini
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return zodiacSigns[3]; // Cancer
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return zodiacSigns[4]; // Leo
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return zodiacSigns[5]; // Virgo
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return zodiacSigns[6]; // Libra
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return zodiacSigns[7]; // Scorpio
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return zodiacSigns[8]; // Sagittarius
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return zodiacSigns[9]; // Capricorn
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return zodiacSigns[10]; // Aquarius
    return zodiacSigns[11]; // Pisces
  }
  
  // Insights by area of interest
  const insightsByArea = {
    love: {
      keywords: ['Connection', 'Harmony', 'Compatibility', 'Communication', 'Vulnerability', 'Trust'],
      previewText: "Your cosmic configuration reveals a period of deep introspection in your love life. The current planetary energies invite you to re-examine your expectations and communicate more openly with your partner. A deeper emotional connection is possible if you allow yourself to be vulnerable. It's time to let go of old barriers that may have hindered your past relationships.",
    },
    career: {
      keywords: ['Opportunity', 'Growth', 'Leadership', 'Innovation', 'Recognition', 'Discipline'],
      previewText: "The current planetary configurations indicate a period of professional renewal. Your creativity is particularly stimulated, which could open doors to new career opportunities. This is the ideal time to present innovative ideas and take initiative. Your natural leadership will be recognized by those around you. However, be sure to balance ambition and collaboration to maximize your impact.",
    },
    health: {
      keywords: ['Balance', 'Vitality', 'Mindfulness', 'Renewal', 'Detox', 'Energy'],
      previewText: "Your cosmic chart indicates that now is the ideal time to renew your approach to wellness. The planetary aspects currently favor a better understanding of the connection between your body and mind. Paying special attention to your diet and sleep could reveal ways to optimize your energy. Practicing mindfulness techniques will help you maintain balance during this transformative period.",
    },
    personal: {
      keywords: ['Transformation', 'Authenticity', 'Awareness', 'Intuition', 'Wisdom', 'Evolution'],
      previewText: "The current cosmic configurations signal a significant period of personal development. Your intuition is particularly sharp, allowing you to access deep inner wisdom. This is the ideal time to re-examine your core values and beliefs. An inner transformation process invites you to align more closely with your authentic self. Stay open to synchronicities that will guide you to your next stage of evolution.",
    },
    family: {
      keywords: ['Harmony', 'Tradition', 'Roots', 'Heritage', 'Connection', 'Stability'],
      previewText: "Your astrological chart reveals a favorable period for healing and strengthening family bonds. The current planetary energies encourage you to explore your family roots and understand how they influence your present. Better communication with family members will create a renewed sense of belonging and stability. It's also an excellent time to establish or strengthen traditions that will enrich your family life in the years to come.",
    },
  };
  
  /**
   * Calculate ascendant based on birth date, time, and location
   * Simplified function for example purposes
   */
  function calculateAscendant(birthDate, birthTime, birthLocation) {
    // This function is a simplified simulation
  
    if (!birthTime || !birthLocation) {
      return null;
    }
    
    // Simulate ascendant calculation based on birth time
    const date = new Date(birthDate);
    const time = birthTime.split(':');
    const hour = parseInt(time[0], 10);
    
    // Simplification: the ascendant changes approximately every 2 hours
    // We simply use the hour to determine an index
    const ascendantIndex = Math.floor(hour / 2) % 12;
    
    return zodiacSigns[ascendantIndex];
  }
  
  /**
   * Generate an astrological preview based on user data
   */
  export async function getAstrologyPreview(userData) {
    // Check that required data is present
    if (!userData.birthDate) {
      throw new Error('Birth date is required');
    }
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const sign = getZodiacSign(userData.birthDate);
    const ascendant = calculateAscendant(userData.birthDate, userData.birthTime, userData.birthLocation);
    
    const areaInsights = insightsByArea[userData.interestArea] || {
      keywords: ['Harmony', 'Balance', 'Awareness', 'Synchronicity'],
      previewText: "The current planetary configurations indicate an important period of growth and development in your life. Your sensitivity to cosmic energies is heightened, allowing you to better perceive the opportunities that present themselves to you. Stay attentive to subtle signs that guide you towards your true path.",
    };
    
    let previewText = areaInsights.previewText;
    
    // Add information about the ascendant if available
    if (ascendant) {
      previewText += ` With your ${ascendant.name} ${ascendant.emoji} ascendant, you approach these influences with ${
        ascendant.name === 'Aries' || ascendant.name === 'Leo' || ascendant.name === 'Sagittarius' 
          ? 'an enthusiasm and passion that energizes those around you' 
          : ascendant.name === 'Taurus' || ascendant.name === 'Virgo' || ascendant.name === 'Capricorn' 
          ? 'a methodical and practical approach that allows you to realize your aspirations' 
          : 'a sensitivity and adaptability that lets you navigate cosmic currents with fluidity'
      }.`;
    }
    
    // Add an influence from the birth location if available
    if (userData.birthLocation) {
      previewText += ` The energy of your birthplace, ${userData.birthLocation}, continues to subtly influence your journey and affinities.`;
    }
    
    return {
      sign,
      ascendant: ascendant || null,
      text: previewText,
      keywords: areaInsights.keywords,
    };
  }

  export async function getFullAstrologyReport(userData) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const sign = getZodiacSign(userData.birthDate);
    const ascendant = calculateAscendant(userData.birthDate, userData.birthTime, userData.birthLocation);
    const areaInsights = insightsByArea[userData.interestArea] || insightsByArea.personal;
    
    // Generate a more detailed report
    return {
      sign,
      ascendant: ascendant || null,
      keywords: areaInsights.keywords,
      overview: [
        areaInsights.previewText,
        ascendant ? `Your ${ascendant.name} ascendant colors your personal expression and influences how others initially perceive you.` : "",
        userData.birthLocation ? `The influence of ${userData.birthLocation}, your birthplace, manifests in your natural affinity with certain environments and cultures.` : "",
        "The aspects between Mars and Venus in your chart suggest a period where the balance between action and receptivity will be crucial. This configuration allows you to harmonize your personal desires with your relationships and external commitments.",
        "The current position of Jupiter in relation to your natal sign amplifies your ability to attract favorable opportunities, particularly in areas related to " + (userData.interestArea === 'love' ? 'love and relationships' : userData.interestArea === 'career' ? 'career and finances' : userData.interestArea === 'health' ? 'health and wellness' : userData.interestArea === 'family' ? 'family and home' : 'personal growth') + ".",
      ].filter(text => text !== ""),
      planets: [
        {
          name: "Sun",
          symbol: "☉",
          sign: sign.name,
          degree: Math.floor(Math.random() * 30),
          house: Math.floor(Math.random() * 12) + 1,
          interpretation: "Your Sun in " + sign.name + " reveals your essence and fundamental expression in the world. In this position, you naturally radiate with " + (sign.name === 'Aries' || sign.name === 'Leo' || sign.name === 'Sagittarius' ? 'a dynamic and enterprising energy' : sign.name === 'Taurus' || sign.name === 'Virgo' || sign.name === 'Capricorn' ? 'a practical and determined approach' : 'an intuitive and adaptable sensitivity') + "."
        },
        {
          name: "Moon",
          symbol: "☽",
          sign: ascendant ? ascendant.name : sign.name,
          degree: Math.floor(Math.random() * 30),
          house: Math.floor(Math.random() * 12) + 1,
          interpretation: "Your Moon in " + (ascendant ? ascendant.name : sign.name) + " reveals your inner emotional landscape and your deep needs to feel secure."
        }
      ]
    };
  }