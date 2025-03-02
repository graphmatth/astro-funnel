'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { OnboardingForm1 } from '@/components/forms/OnboardingForm1';
import { OnboardingForm2 } from '@/components/forms/OnboardingForm2';
import { OnboardingForm3 } from '@/components/forms/OnboardingForm3';
import { IphoneStep } from '@/components/forms/IphoneStep';
import { useAstrologyData } from '@/context/AstrologyContext';
import { isMobileOnly, isIOS } from 'react-device-detect';

const baseSteps = [
  {
    title: 'Basic Information',
    description: "Let's start with your birth details",
    component: OnboardingForm1,
  },
  {
    title: 'Additional Details',
    description: 'Tell us more about yourself',
    component: OnboardingForm2,
  },
  {
    title: 'Your Cosmic Insights',
    description: 'Discover your personalized horoscope',
    component: OnboardingForm3,
  },
];


export default function AstroLayout() {
  const { currentStep, userData, updateUserData } = useAstrologyData();
  const [steps, setSteps] = useState([...baseSteps]);

  useEffect(() => {
    if (isMobileOnly && isIOS) {
      updateUserData({ ...userData, hasIphone: true });
    }
  }, []);

  useEffect(() => {
    if (userData.hasIphone !== true && currentStep === 1) {
      const newSteps = [
        {
          title: 'Device Information',
          description: 'Help us optimize your experience',
          component: IphoneStep,
        },
        ...baseSteps,
      ];
      setSteps(newSteps);
    } else {
      setSteps([...baseSteps]);
    }
  }, [userData.hasIphone]);

  if (!steps.length || currentStep < 1 || currentStep > steps.length) {
    return <div>Loading...</div>;
  }

  const CurrentStep = steps[currentStep - 1].component;
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-dvh bg-gradient-to-b">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-primary mb-2 text-4xl font-bold">{steps[currentStep - 1].title}</h1>
          <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <motion.div className="h-1 w-full overflow-hidden rounded-full bg-purple-300">
            <div
              className="h-1 rounded-full"
              style={{ width: `${Math.round(progress)}%`, transition: 'all .25s ease-in-out', backgroundColor: '#905AFF' }}
            />
          </motion.div>
          <div className="text-muted-foreground mt-2 flex justify-between text-sm">
            <span>
              Step {currentStep} of {steps.length}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </motion.div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <CurrentStep />
        </motion.div>
      </div>
    </div>
  );
}
