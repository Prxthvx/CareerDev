'use client';

import { ElementType } from 'react';

interface IconProps {
  icon: ElementType;
  className?: string;
}

export default function Icon({ icon: Icon, className = '' }: IconProps) {
  return (
    <Icon
      className={`h-5 w-5 flex-none text-teal-600 dark:text-teal-400 ${className}`}
      aria-hidden="true"
      suppressHydrationWarning
    />
  );
} 