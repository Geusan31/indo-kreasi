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
    <div className={`mb-10 sm:mb-12 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'} ${className}`}>
      {kicker && (
        <p className="text-xs font-medium text-[#C4B5FD] tracking-wide mb-2.5">
          {kicker}
        </p>
      )}

      <h2
        className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#F5F3FF] tracking-tight leading-[1.2]"
        style={{ textWrap: 'balance' }}
      >
        {title}
      </h2>

      {description && (
        <p className="mt-3.5 text-sm sm:text-base text-[#A7A1B5] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
