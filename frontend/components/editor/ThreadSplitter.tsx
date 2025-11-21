'use client';

import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ThreadSplitterProps {
    content: string;
    charLimit?: number;
}

interface Tweet {
    id: number;
    text: string;
    charCount: number;
}

export function ThreadSplitter({ content, charLimit = 280 }: ThreadSplitterProps) {
    const tweets = useMemo(() => {
        if (!content.trim()) return [];

        // Split by double line breaks first
        const paragraphs = content.split(/\n\n+/);
        const result: Tweet[] = [];
        let currentTweet = '';
        let tweetId = 1;

        paragraphs.forEach((paragraph) => {
            const trimmed = paragraph.trim();

            if (currentTweet.length + trimmed.length + 2 <= charLimit) {
                // Can fit in current tweet
                currentTweet += (currentTweet ? '\n\n' : '') + trimmed;
            } else {
                // Save current tweet if not empty
                if (currentTweet) {
                    result.push({
                        id: tweetId++,
                        text: currentTweet,
                        charCount: currentTweet.length,
                    });
                    currentTweet = '';
                }

                // If paragraph itself is too long, split it
                if (trimmed.length > charLimit) {
                    const words = trimmed.split(' ');
                    let tempTweet = '';

                    words.forEach((word) => {
                        if (tempTweet.length + word.length + 1 <= charLimit) {
                            tempTweet += (tempTweet ? ' ' : '') + word;
                        } else {
                            if (tempTweet) {
                                result.push({
                                    id: tweetId++,
                                    text: tempTweet,
                                    charCount: tempTweet.length,
                                });
                            }
                            tempTweet = word;
                        }
                    });

                    currentTweet = tempTweet;
                } else {
                    currentTweet = trimmed;
                }
            }
        });

        // Add remaining content
        if (currentTweet) {
            result.push({
                id: tweetId,
                text: currentTweet,
                charCount: currentTweet.length,
            });
        }

        return result;
    }, [content, charLimit]);

    if (tweets.length === 0) return null;

    const isThread = tweets.length > 1;

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <h3 className="text-sm font-semibold text-gray-700">Preview</h3>
                {isThread && (
                    <Badge variant="secondary" className="text-xs">
                        Thread ({tweets.length} tweets)
                    </Badge>
                )}
            </div>

            <div className="space-y-3">
                {tweets.map((tweet, index) => (
                    <Card key={tweet.id} className="p-4 bg-gray-50 border-gray-200">
                        <div className="flex items-start gap-3">
                            {/* Thread indicator */}
                            {isThread && (
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-semibold">
                                        {index + 1}
                                    </div>
                                </div>
                            )}

                            {/* Tweet content */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm whitespace-pre-wrap break-words text-gray-900">
                                    {tweet.text}
                                </p>
                                <div className="mt-2 flex items-center justify-between">
                                    <span className="text-xs text-gray-500">
                                        {tweet.charCount} / {charLimit}
                                    </span>
                                    {isThread && index < tweets.length - 1 && (
                                        <span className="text-xs text-blue-500">→</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
