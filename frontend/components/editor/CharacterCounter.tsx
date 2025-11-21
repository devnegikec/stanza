'use client';

import { cn } from '@/lib/utils';

interface CharacterCounterProps {
    current: number;
    max: number;
}

export function CharacterCounter({ current, max }: CharacterCounterProps) {
    const percentage = (current / max) * 100;
    const isWarning = percentage >= 80 && percentage < 100;
    const isError = percentage >= 100;
    const isNearLimit = percentage >= 90;

    // Circle properties
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    // Color based on percentage
    const getColor = () => {
        if (isError) return 'text-red-500';
        if (isWarning) return 'text-yellow-500';
        return 'text-blue-500';
    };

    const getStrokeColor = () => {
        if (isError) return '#ef4444';
        if (isWarning) return '#eab308';
        return '#3b82f6';
    };

    return (
        <div className="flex items-center gap-3 bg-white rounded-full shadow-lg px-4 py-2 border border-gray-200">
            {/* Circle Counter */}
            <div className="relative w-12 h-12">
                {/* Background circle */}
                <svg className="transform -rotate-90 w-12 h-12">
                    <circle
                        cx="24"
                        cy="24"
                        r={radius}
                        stroke="#e5e7eb"
                        strokeWidth="3"
                        fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                        cx="24"
                        cy="24"
                        r={radius}
                        stroke={getStrokeColor()}
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-300"
                        strokeLinecap="round"
                    />
                </svg>

                {/* Center text - show number only when near limit */}
                {isNearLimit && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className={cn('text-xs font-semibold', getColor())}>
                            {max - current}
                        </span>
                    </div>
                )}
            </div>

            {/* Text counter */}
            <div className="text-sm">
                <span className={cn('font-medium', getColor())}>
                    {current}
                </span>
                <span className="text-gray-400"> / {max}</span>
            </div>
        </div>
    );
}
