import React, { useState, useEffect, useRef } from 'react';

const LocationInput = ({ value, onChange, error }) => {
  const [query, setQuery] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const suggestionRef = useRef(null);

  const sampleLocations = [
    "Paris, France",
    "London, United Kingdom",
    "New York, USA",
    "Tokyo, Japan",
    "Berlin, Germany",
    "Madrid, Spain",
    "Rome, Italy",
    "Amsterdam, Netherlands",
    "Brussels, Belgium",
    "Vienna, Austria",
    "Prague, Czech Republic",
    "Lisbon, Portugal",
    "Dublin, Ireland",
    "Athens, Greece",
    "Warsaw, Poland"
  ];

  useEffect(() => {
    // Handle clicks outside the component to close suggestions
    const handleClickOutside = (event) => {
      if (
        suggestionRef.current && 
        !suggestionRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    
    // Simulate API call with setTimeout
    setIsLoading(true);
    setTimeout(() => {
      if (inputValue.trim() === '') {
        setSuggestions([]);
      } else {
        const filteredLocations = sampleLocations.filter(location => 
          location.toLowerCase().includes(inputValue.toLowerCase())
        );
        setSuggestions(filteredLocations.slice(0, 5));
      }
      setIsLoading(false);
    }, 300);
    
  
    onChange(inputValue);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    onChange(suggestion);
    setSuggestions([]);
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (query.trim() !== '') {
      // Show suggestions immediately on focus if there's text
      handleInputChange({ target: { value: query } });
    }
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        className={`w-full p-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
        placeholder="Enter a location..."
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus}
      />
      
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      
      {isFocused && (suggestions.length > 0 || isLoading) && (
        <div 
          ref={suggestionRef}
          className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-2 text-center text-gray-500">Loading suggestions...</div>
          ) : (
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default LocationInput;