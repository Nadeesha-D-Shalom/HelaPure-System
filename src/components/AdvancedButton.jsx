import React from 'react';

const AdvancedButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false, 
  icon = null, 
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-primary text-white hover:shadow-lg focus:ring-deep-green',
    secondary: 'bg-gradient-secondary text-white hover:shadow-lg focus:ring-earthy-tan',
    outline: 'border-2 border-deep-green text-deep-green hover:bg-deep-green hover:text-white focus:ring-deep-green',
    ghost: 'text-deep-green hover:bg-light-cream focus:ring-deep-green',
    danger: 'bg-danger-red text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-success-green text-white hover:bg-green-700 focus:ring-green-500',
    warning: 'bg-warning-orange text-white hover:bg-yellow-600 focus:ring-yellow-500',
    info: 'bg-info-blue text-white hover:bg-blue-600 focus:ring-blue-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;
  
  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

export default AdvancedButton;

