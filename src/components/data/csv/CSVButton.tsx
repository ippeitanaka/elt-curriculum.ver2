import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CSVButtonProps {
  onClick: () => void;
  icon: LucideIcon;
  label: string;
  variant: 'primary' | 'secondary' | 'success';
  disabled?: boolean;
}

const variantStyles = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
  success: 'bg-green-600 hover:bg-green-700 text-white'
};

export function CSVButton({ 
  onClick, 
  icon: Icon, 
  label, 
  variant,
  disabled 
}: CSVButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center px-4 py-2 rounded-md
        ${variantStyles[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        transition-colors duration-200
      `}
    >
      <Icon className="w-4 h-4 mr-2" />
      {label}
    </button>
  );
}