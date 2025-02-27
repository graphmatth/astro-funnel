'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAstrologyData } from '@/context/AstrologyContext';
import OnboardingForm2 from '@/components/forms/OnboardingForm2';

export default function Step2Page() {
  const router = useRouter();
  const { userData, updateUserData, currentStep } = useAstrologyData();

  const handleSubmit = (formData) => {
    updateUserData(formData);
    router.push('/insights');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        Fine-tune Your Cosmic Profile
      </h1>
      <p className="text-center mb-8">
        Let's add more details to provide you with more accurate insights.
      </p>
      
      <OnboardingForm2 
        initialData={userData}
        onSubmit={handleSubmit}
      />
    </div>
  );
}