import React from 'react';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  description,
  align = 'left',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-10 sm:mb-14 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'} ${className}`}>
      {kicker && (
        <div className="flex items-center gap-2 mb-2.5 font-mono text-xs uppercase tracking-widest text-[#C4B5FD] font-semibold">
          {isCenter && <span className="w-6 h-[1px] bg-[#8B5CF6]" />}
          <span>{kicker}</span>
          <span className="w-6 h-[1px] bg-[#8B5CF6]" />
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#F5F3FF] tracking-tight leading-[1.15]">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base sm:text-lg text-[#A7A1B5] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
