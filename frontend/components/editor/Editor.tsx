'use client';

import { useState, useEffect } from 'react';
import { CharacterCounter } from './CharacterCounter';
import { cn } from '@/lib/utils';

interface EditorProps {
    content?: string;
    onChange?: (content: string) => void;
    platform?: 'x' | 'linkedin' | 'both';
}

const CHAR_LIMITS = {
    x: 280,
    linkedin: 3000,
};

export function Editor({ content: initialContent = '', onChange, platform = 'x' }: EditorProps) {
    const [content, setContent] = useState(initialContent);
    const [isFocused, setIsFocused] = useState(false);

    const charLimit = platform === 'linkedin' ? CHAR_LIMITS.linkedin : CHAR_LIMITS.x;
    const charCount = content.length;
    const isOverLimit = charCount > charLimit;

    useEffect(() => {
        onChange?.(content);
    }, [content, onChange]);

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        const text = e.currentTarget.textContent || '';
        setContent(text);
    };

    return (
        <div className="flex flex-col h-full">
            {/* Editor Container */}
            <div className="flex-1 flex flex-col">
                <div
                    className={cn(
                        'flex-1 outline-none p-8 text-lg leading-relaxed',
                        'min-h-[400px] max-w-3xl mx-auto w-full',
                        'transition-all duration-200',
                        isFocused && 'ring-0',
                        isOverLimit && 'text-red-500'
                    )}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleInput}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    data-placeholder="What's on your mind?"
                    style={{
                        whiteSpace: 'pre-wrap',
                        wordWrap: 'break-word',
                    }}
                >
                    {initialContent}
                </div>
            </div>

            {/* Character Counter - Fixed at bottom right */}
            <div className="fixed bottom-8 right-8 z-10">
                <CharacterCounter current={charCount} max={charLimit} />
            </div>

            <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
        </div>
    );
}
