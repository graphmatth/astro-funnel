
'use client';

import React from 'react';
import { useState } from 'react';
import { useAstrologyData } from '@/context/AstrologyContext';
import { getAstrologyPreview } from '@/lib/astrology';
import InsightPreview from '@/components/insights/InsightPreview';
import { Button } from '../common/Button';

export const OnboardingForm3 = () => {
    const { userData, updateUserData } = useAstrologyData();
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(true);
    
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
    }, []);



    if (loading) {
        return "Chargement..."
    } 
    

    return (
        <>
            <Button
                type='button'
                variant="outline"
                className="mb-3"
                onClick={() => updateUserData({ ...userData, currentStep: 2 })}>
                    Back
            </Button>
            <h1 className="text-2xl font-bold text-center mb-6">
                Your Cosmic Insights
            </h1>

            <div>

            {insights && (
                <InsightPreview 
                insights={insights}
                interestArea={userData.interestArea}
                />
            )}
                <form action="/api/checkout_sessions" method="POST" className='-mt-15 z-10 text-center relative'>
                    <input type="hidden" name="userData" value={JSON.stringify(userData)} />
                    <section>
                    <button className='bg-purple-700 text-white rounded-xl p-3' type="submit" role="link">
                        Checkout
                    </button>
                    </section>
                </form>
            </div>
        </>
    )
}