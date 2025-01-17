import React from 'react';

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  placeholder?: string;
  className?: string;
}

export function NumberInput({
  value,
  onChange,
  min,
  max,
  placeholder,
  className = ''
}: NumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === '') {
      onChange('');
      return;
    }

    const numValue = parseInt(newValue, 10);
    if (isNaN(numValue)) return;
    
    if (min !== undefined && numValue < min) return;
    if (max !== undefined && numValue > max) return;
    
    onChange(numValue.toString());
  };

  return (
    <input
      type="number"
      value={value}
      onChange={handleChange}
      min={min}
      max={max}
      placeholder={placeholder}
      className={`
        block w-full rounded-md border-gray-300 shadow-sm
        focus:border-blue-500 focus:ring-1 focus:ring-blue-500
        sm:text-sm ${className}
      `}
    />
  );
}