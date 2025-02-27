'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAstrologyData } from '@/context/AstrologyContext';
import { getAstrologyPreview } from '@/lib/astrology';
import InsightPreview from '@/components/insights/InsightPreview';

export default function InsightsPage() {
  const router = useRouter();
  const { userData, currentStep } = useAstrologyData();
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const previewData = await getAstrologyPreview({
          birthDate: userData.birthDate,
          birthLocation: userData.birthLocation,
          birthTime: userData.birthTime,
          interestArea: userData.interestArea
        });
        
        setInsights(previewData);
      } catch (error) {
        console.error('Failed to load insights:', error);
      } finally {
        setLoading(false);
      }
    };  
    fetchInsights();
}, [userData, currentStep, router]);



  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-lg text-center">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
          <div className="h-24 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-2xl font-bold text-center mb-6">
        Your Cosmic Insights
      </h1>
      
      {insights && (
        <InsightPreview 
          insights={insights}
          interestArea={userData.interestArea}
        />
      )}
      
      <div className="bg-gradient-to-b from-transparent to-white pt-12 pb-4 relative">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-3">
            Unlock Your Complete Cosmic Analysis
          </h2>
          <p className="mb-6 text-gray-600">
            Access your full personalized report with detailed insights and guidance.
          </p>

          <form action="/api/checkout_sessions" method="POST">
            <section>
              <button className='bg-purple-700 text-white rounded-xl p-3' type="submit" role="link">
                Checkout
              </button>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
}