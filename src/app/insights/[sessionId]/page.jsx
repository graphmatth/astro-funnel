'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getFullAstrologyReport } from '@/lib/astrology';
import { useAstrologyData } from '@/context/AstrologyContext';
import FullInsights from '@/components/insights/FullInsights';
import { useRouter } from 'next/navigation'
import { Button } from '@/components/common/Button';

async function verifyPayment(sessionId) {
  try {
    const response = await fetch(`/api/verify_payment?session_id=${sessionId}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Payment verification failed');

    }

    return await response.json();
  } catch (error) {
    console.error('Error during payment verification:', error);
    
    throw error;
  }
}

export default function InsightPage() {
  const params = useParams();
  const router = useRouter()

  const sessionId = params.sessionId;
  const [report, setReport] = useState(null);
  const { userData, updateUserData, } = useAstrologyData();

  const [status, setStatus] = useState({
    loading: true,
    verified: false,
    error: null,
    customerDetails: null,
    metadata: null,
  });

  useEffect(() => {
    if (sessionId) {
      verifyCustomerPayment(sessionId);
    }
  }, [sessionId]);

  async function verifyCustomerPayment(sessionId) {
    try {
      const result = await verifyPayment(sessionId);

      setStatus({
        loading: false,
        verified: result.verified,
        customerDetails: result.customerDetails,
        metadata: result.metadata,
        error: null
      });

      const fullReport = await getFullAstrologyReport(userData);
      setReport(fullReport);

      updateUserData({hasPaid: true})

    } catch (error) {
      setStatus({
        loading: false,
        verified: false,
        customerDetails: null,
        metadata: null,
        error: error.message
      });
    }
  }


  if (status.error) {
    return (
      <div className="flex items-center justify-center min-h-dvh">
        <div className="p-4 text-center bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 text-red-700">Verification Error</h2>
          <p className="text-red-600">{status.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto max-w-2xl'>
      <Button variant="outline" className="m-2.5"  onClick={() => router.push("/")}>Back Home</Button>


      <div className="flex items-center justify-center min-h-dvh"> 
        <div className="p-3 bg-white border border-green-200 rounded-lg shadow-md container">
      <div className="mb-8">
          <div className="h-1  bg-purple-300 rounded-full overflow-hidden w-full">
            <div className="h-1 rounded-full" style={{ width: `100%`, backgroundColor: "#905AFF"}} />
        </div>
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Step 4 of 4</span>
            <span>100% Complete</span>
          </div>
        </div>
          <h1 className="text-2xl font-bold mb-4 text-green-700">Payment Confirmed!</h1>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Your Insights Are Ready!</h2>
            <p className="text-gray-700">
              You now have access to all our detailed analyses. Use the tools below to explore your data.
            </p>
          </div>
          <div className='my-10'>
            {report && (
              <FullInsights
                report={report}
                interestArea={userData.interestArea}
              />
            )}
        </div>
      </div>
    </div>
    </div>
  );
}
