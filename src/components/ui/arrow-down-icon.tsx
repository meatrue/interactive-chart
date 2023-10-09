import React from 'react';

export const ArrowDownIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="17"
      viewBox="0 0 28 17"
      fill="none"
      className={className}
    >
      <path d="M26 2L14 14L2 2" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
};