
'use client';

import React from 'react';
import { useState } from 'react';
import { useAstrologyData } from '@/context/AstrologyContext';
import { getAstrologyPreview } from '@/lib/astrology';
import InsightPreview from '@/components/insights/InsightPreview';


export const OnboardingForm3 = () => {
    const { userData } = useAstrologyData();
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(true);
    const [variant, setVariant] = useState(null);



    useEffect(() => {
      const assignedVariant = Math.random() < 0.5 ? 'A' : 'B';
      setVariant(assignedVariant);


      logEvent('AB_TEST_VARIANT', { variant: assignedVariant });
    }, []);

    
      React.useEffect(() => {
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
    }, [userData]);
    
    
    return (
        <>
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
                    <button className='bg-purple-700 text-white rounded-xl p-3'>
                        Checkout
                    </button>
                    {variant === 'A' ? (
                      <button className="bg-purple-700 text-white rounded-xl p-3"  type="submit">
                        Unlock Insights for $30.00
                      </button>
                    ) : (
                      <button className="bg-green-500 text-white p-4">
                        Get Your Full Report Now!
                      </button>
                    )}
                    </section>
                </form>
                </div>
            </div>
        </>
    )
}