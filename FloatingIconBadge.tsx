import type { ReactNode } from 'react';

interface FloatingIconBadgeProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  delayMs?: number;
  className?: string;
}

export function FloatingIconBadge({
  children,
  size = 'md',
  delayMs = 0,
  className = '',
}: FloatingIconBadgeProps) {
  const sizeClasses = {
    sm: 'w-10 h-10 rounded-xl',
    md: 'w-12 h-12 rounded-xl',
    lg: 'w-14 h-14 rounded-2xl',
  }[size];

  return (
    <span
      style={{ animationDelay: `${delayMs}ms` }}
      className={`animate-float-gentle inline-flex items-center justify-center ${sizeClasses} bg-[#1E293B] text-white border border-[#1E293B] shadow-sm transition-all duration-300 ease-out hover:bg-white hover:text-[#25C77A] hover:border-[#25C77A] hover:scale-110 hover:rotate-6 hover:shadow-[0_0_20px_rgba(37,199,122,0.38)] group-hover:bg-white group-hover:text-[#25C77A] group-hover:border-[#25C77A] group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_20px_rgba(37,199,122,0.38)] ${className}`}
    >
      {children}
    </span>
  );
}
