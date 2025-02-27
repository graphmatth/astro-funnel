'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import DatePicker from '@/components/common/DatePicker';
import LocationInput from '@/components/common/LocationInput';
import { Button } from '@/components/common/Button';
import { useAstrologyData } from '@/context/AstrologyContext';

export const OnboardingForm1 = () => {
  const { userData, updateUserData } = useAstrologyData();

  const [formData, setFormData] = useState({
    birthDate: userData.birthDate || '',
    birthLocation: userData.birthLocation || '',
  });
  
  const [errors, setErrors] = useState({});

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, birthDate: date }));
  };

  const handleLocationChange = (location) => {
    setFormData(prev => ({ ...prev, birthLocation: location }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.birthDate) {
      newErrors.birthDate = 'Birth date is required';
    }
    
    if (!formData.birthLocation) {
      newErrors.birthLocation = 'Birth location is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("formata ", formData)
    
    if (validateForm()) {
      // onSubmit(formData);
        updateUserData({ ...formData, currentStep: 2 });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">
          When were you born?
        </label>
        <DatePicker
          value={formData.birthDate}
          onChange={handleDateChange}
          error={errors.birthDate}
        />
        {errors.birthDate && (
          <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium">
          Where were you born?
        </label>
        <LocationInput
          value={formData.birthLocation}
          onChange={handleLocationChange}
          error={errors.birthLocation}
        />
        {errors.birthLocation && (
          <p className="text-red-500 text-sm mt-1">{errors.birthLocation}</p>
        )}
      </div>
      
      <Button
        type="submit"
        className="mt-8"s
      >
        Continue to Next Step
      </Button>
    </form>
  );
}