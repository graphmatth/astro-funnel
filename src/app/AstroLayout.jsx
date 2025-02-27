"use client";

import { motion } from "motion/react"
// import StepOne from "@/components/onboarding/StepOne";
import { OnboardingForm1 as StepOne } from '@/components/forms/OnboardingForm1';
import { OnboardingForm2 as StepTwo } from '@/components/forms/OnboardingForm2';
import { OnboardingForm3  as StepThree} from '@/components/forms/OnboardingForm3';
import { useAstrologyData } from '@/context/AstrologyContext';

export default function AstroLayout({ children }) {
  const { currentStep } = useAstrologyData();

  const steps = [
    {
      component: StepOne,
      title: "Basic Information",
      description: "Let's start with your birth details",
    },
    {
      component: StepTwo,
      title: "Additional Details",
      description: "Tell us more about yourself",
    },
    {
      component: StepThree,
      title: "Your Cosmic Insights",
      description: "Discover your personalized horoscope",
    },
    {
      component: <></>,
      title: "Your Cosmic Insights",
      description: "Discover your personalized horoscope",
    },
  ];

  const CurrentStep = steps[currentStep - 1].component;
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-dvh bg-gradient-to-b">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-primary mb-2">
            {steps[currentStep - 1].title}
          </h1>
          <p className="text-muted-foreground">
            {steps[currentStep - 1].description}
          </p>
        </motion.div>

        <div className="mb-8">
          <div className="h-1  bg-purple-300 rounded-full overflow-hidden w-full">
            <div className="h-1 rounded-full" style={{ width: `${Math.round(progress)}%`, backgroundColor: "#905AFF"}} />
        </div>
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Step {currentStep} of {steps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep <= 3 ? <CurrentStep /> : children}
        </motion.div>
      </div>
    </div>
  );
}