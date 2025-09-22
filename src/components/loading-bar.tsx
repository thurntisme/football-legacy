'use client';

import { useEffect, useState } from 'react';

import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface LoadingBarProps {
  progress?: number;
  indeterminate?: boolean;
  showPercentage?: boolean;
  className?: string;
  color?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  duration?: number;
  onComplete?: () => void;
}

export function LoadingBar({
  progress: externalProgress,
  indeterminate = false,
  showPercentage = true,
  className,
  color = 'default',
  size = 'md',
  label,
  duration = 2000,
  onComplete,
}: LoadingBarProps) {
  const [progress, setProgress] = useState(externalProgress || 0);

  // Handle external progress updates
  useEffect(() => {
    if (externalProgress !== undefined && !indeterminate) {
      setProgress(externalProgress);

      if (externalProgress >= 100 && onComplete) {
        onComplete();
      }
    }
  }, [externalProgress, indeterminate, onComplete]);

  // Handle indeterminate progress animation
  useEffect(() => {
    if (indeterminate) {
      const timer = setTimeout(() => {
        setProgress(100);
        if (onComplete) {
          onComplete();
        }
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [indeterminate, duration, onComplete]);

  // Animate progress for indeterminate mode
  useEffect(() => {
    if (indeterminate) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const increment = Math.random() * 10;
          const newProgress = prevProgress + increment;
          return newProgress < 90 ? newProgress : prevProgress;
        });
      }, duration / 10);

      return () => clearInterval(interval);
    }
  }, [indeterminate, duration]);

  const colorClasses = {
    default: '',
    success: 'text-green-600',
    warning: 'text-amber-600',
    error: 'text-red-600',
  };

  const progressColorClasses = {
    default: '',
    success: '[--progress-foreground:theme(colors.green.600)]',
    warning: '[--progress-foreground:theme(colors.amber.600)]',
    error: '[--progress-foreground:theme(colors.red.600)]',
  };

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={cn('w-full space-y-2', className)}>
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">{label}</span>
          {showPercentage && (
            <span className={cn('text-sm font-medium', colorClasses[color])}>
              {Math.round(progress)}%
            </span>
          )}
        </div>
      )}
      <Progress
        value={progress}
        className={cn(sizeClasses[size], progressColorClasses[color])}
      />
      {!label && showPercentage && (
        <div className="flex justify-end">
          <span className={cn('text-sm font-medium', colorClasses[color])}>
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
}
