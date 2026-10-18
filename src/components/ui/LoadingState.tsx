import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Memuat data...',
  className = 'py-16',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 text-center ${className}`}>
      <Loader2 className="w-8 h-8 text-[#8B5CF6] animate-spin" />
      <span className="text-xs sm:text-sm text-[#A7A1B5] font-medium">{message}</span>
    </div>
  );
};
