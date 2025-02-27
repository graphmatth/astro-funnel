'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAstrologyData } from '@/context/AstrologyContext';
import OnboardingForm1 from '@/components/forms/OnboardingForm1';

export default function Step1Page() {
  const router = useRouter();
  const { userData, updateUserData, currentStep } = useAstrologyData();

  const handleSubmit = (formData) => {
    updateUserData(formData);
    router.push('/onboarding/step2');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        Discover Your Cosmic Journey
      </h1>
      <p className="text-center mb-8">
        Let's start by collecting some basic information about your birth.
      </p>
      
      <OnboardingForm1 
        initialData={userData}
        onSubmit={handleSubmit}
      />
    </div>
  );
}