// components/forms/OnboardingForm2.jsx
'use client';
import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { useAstrologyData } from '@/context/AstrologyContext';
import { logEvent } from '@/lib/amplitude';

const INTEREST_AREAS = [
  { id: 'love', label: 'Love & Relationships' },
  { id: 'career', label: 'Career & Finance' },
  { id: 'health', label: 'Health & Wellness' },
  { id: 'personal', label: 'Personal Growth' },
  { id: 'family', label: 'Family & Home' },
];

export const OnboardingForm2 = () => {
  const { userData, updateUserData, currentStep, setUserData } = useAstrologyData();

  const [formData, setFormData] = useState({
    birthTime: userData.birthTime || '',
    interestArea: userData.interestArea || '',
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.birthTime) {
      newErrors.birthTime = 'Birth time is required';
    }
    
    if (!formData.interestArea) {
      newErrors.interestArea = 'Please select an area of interest';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    logEvent('Onboarding Step 1 Completed', {
      birthTime: formData.birtTime,
    });
    
    if (validateForm()) {
        updateUserData({ ...formData, currentStep: 3 });
    }
  };

  return (
    <>
    <Button
      type='button'
      variant="outline"
      className="my-2"
      onClick={() => updateUserData({ ...userData, currentStep: 1 })}>
        Back
    </Button>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">
          What time were you born? (if known)
        </label>
        <input
          type="time"
          name="birthTime"
          value={formData.birthTime}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md ${errors.birthTime ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.birthTime && (
          <p className="text-red-500 text-sm mt-1">{errors.birthTime}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">
          Which area of your life interests you most today?
        </label>
        <div className="space-y-2">
          {INTEREST_AREAS.map(area => (
            <label key={area.id} className="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="interestArea"
                value={area.id}
                checked={formData.interestArea === area.id}
                onChange={handleChange}
                className="mr-2"
              />
              {area.label}
            </label>
          ))}
        </div>
        {errors.interestArea && (
          <p className="text-red-500 text-sm mt-1">{errors.interestArea}</p>
        )}
      </div>
      
      <Button
        type="submit"
        className="mt-8"
      >
        View Your Cosmic Insights
      </Button>
    </form>
    </>
  );
}