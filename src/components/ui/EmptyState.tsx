import React from 'react';
import { LucideIcon, FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon: Icon = FolderOpen,
  actionText,
  onAction,
  className = 'py-16',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center rounded-xl bg-[#171321] border border-[#332A45] max-w-lg mx-auto space-y-4 ${className}`}>
      <div className="w-12 h-12 rounded-xl bg-[#201A2D] border border-[#332A45] flex items-center justify-center text-[#8B5CF6]">
        <Icon className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h3 className="font-display font-semibold text-base sm:text-lg text-[#F5F3FF]">
          {title}
        </h3>
        {description && (
          <p className="text-xs sm:text-sm text-[#A7A1B5] leading-relaxed max-w-sm">
            {description}
          </p>
        )}
      </div>
      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-white transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
