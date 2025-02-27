import React, { useState } from 'react';
import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';

const DatePicker = ({ value, onChange, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleDateSelect = (date) => {
    onChange(date);
    setIsOpen(false);
  };
  
  const formatDate = (date) => {
    if (!date) return '';
    return format(new Date(date), 'dd/MM/yyyy', { locale: fr });
  };
  
  const generateCalendar = () => {
    const today = value ? new Date(value) : new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDayOfMonth.getDate();
    const startDay = firstDayOfMonth.getDay() || 7;
    
    // Create calendar grid
    const calendar = [];
    let day = 1;
    
    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 1; j <= 7; j++) {
        if ((i === 0 && j < startDay) || day > daysInMonth) {
          week.push(null);
        } else {
          week.push(new Date(year, month, day++));
        }
      }
      
      calendar.push(week);
      if (day > daysInMonth) break;
    }
    
    return calendar;
  };
  
  const goToPreviousMonth = () => {
    const currentDate = value ? new Date(value) : new Date();
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    onChange(newDate);
  };
  
  const goToNextMonth = () => {
    const currentDate = value ? new Date(value) : new Date();
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    onChange(newDate);
  };
  
  const isCurrentDay = (date) => {
    if (!date || !value) return false;
    const currentValue = new Date(value);
    return (
      date.getDate() === currentValue.getDate() &&
      date.getMonth() === currentValue.getMonth() &&
      date.getFullYear() === currentValue.getFullYear()
    );
  };
  
  const calendar = generateCalendar();
  
  return (
    <div className="relative">
      <div className="mb-1">
        <input
          type="text"
          className={`w-full p-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
          value={formatDate(value)}
          readOnly
          onClick={() => setIsOpen(!isOpen)}
          placeholder="JJ/MM/AAAA"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white border rounded shadow-lg p-2">
          <div className="flex justify-between items-center mb-2">
            <button
              type="button"
              className="p-1 text-gray-600 hover:text-gray-800"
              onClick={goToPreviousMonth}
            >
              &lt;
            </button>
            <div className="font-medium">
              {format(value ? new Date(value) : new Date(), 'MMMM yyyy', { locale: fr })}
            </div>
            <button
              type="button"
              className="p-1 text-gray-600 hover:text-gray-800"
              onClick={goToNextMonth}
            >
              &gt;
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
              <div key={i} className="text-center text-sm font-medium text-gray-600">
                {day}
              </div>
            ))}
            
            {calendar.flatMap((week, i) =>
              week.map((date, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`
                    text-center p-1 text-sm rounded cursor-pointer
                    ${!date ? 'invisible' : ''}
                    ${isCurrentDay(date) ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
                  `}
                  onClick={() => date && handleDateSelect(date)}
                >
                  {date ? date.getDate() : ''}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;