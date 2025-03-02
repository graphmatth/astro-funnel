'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getFullAstrologyReport } from '@/lib/astrology';
import { useAstrologyData } from '@/context/AstrologyContext';
import FullInsights from '@/components/insights/FullInsights';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { logEvent } from '@/lib/amplitude';

async function verifyPayment(sessionId) {
  try {
    const response = await fetch(`/api/verify_payment?session_id=${sessionId}`);

    if (!response.ok) {
      const errorData = await response.json();
      logEvent('CHECKOUT_FAILED', {
        error: errorData.message || 'Payment verification failed',
        action: 'checkout',
      });
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
  const router = useRouter();

  const sessionId = params.sessionId;
  const [report, setReport] = useState(null);
  const { userData, updateUserData } = useAstrologyData();

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
        error: null,
      });

      const fullReport = await getFullAstrologyReport(userData);
      setReport(fullReport);
      updateUserData({ hasPaid: true });
      logEvent('CHECKOUT_SUCCESS', {
        action: 'checkout',
      });
    } catch (error) {
      setStatus({
        loading: false,
        verified: false,
        customerDetails: null,
        metadata: null,
        error: error.message,
      });
    }
  }

  if (status.error) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
          <h2 className="mb-2 text-xl font-semibold text-red-700">Verification Error</h2>
          <p className="text-red-600">{status.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl">
      <Button variant="outline" className="m-2.5" onClick={() => router.push('/')}>
        Back Home
      </Button>

      <div className="flex min-h-dvh justify-center">
        <div className="container rounded-lg border border-green-200 bg-white p-3 shadow-md">
          <div className="mb-8">
            <div className="h-1 w-full overflow-hidden rounded-full bg-purple-300">
              <div
                className="h-1 rounded-full"
                style={{ width: `100%`, backgroundColor: '#905AFF' }}
              />
            </div>
            <div className="text-muted-foreground mt-2 flex justify-between text-sm">
              <span>Step 4 of 4</span>
              <span>100% Complete</span>
            </div>
          </div>
          <h1 className="mb-4 text-2xl font-bold text-green-700">Payment Confirmed!</h1>

          <div className="mt-6">
            <h2 className="mb-3 text-xl font-semibold">Your Insights Are Ready!</h2>
            <p className="text-gray-700">
              You now have access to all our detailed analyses. Use the tools below to explore your
              data.
            </p>
          </div>
          <div className="my-10">
            {report && <FullInsights report={report} interestArea={userData.interestArea} />}
          </div>
        </div>
      </div>
    </div>
  );
}
