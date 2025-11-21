'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Heart, MessageCircle, Repeat2, Share, ThumbsUp, Share2 } from 'lucide-react';

interface MobilePreviewProps {
    content: string;
    authorName?: string;
    authorHandle?: string;
    authorAvatar?: string;
}

export function MobilePreview({
    content,
    authorName = 'Your Name',
    authorHandle = '@yourhandle',
    authorAvatar = '👤',
}: MobilePreviewProps) {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
    });

    return (
        <div className="w-full max-w-md mx-auto">
            <Tabs defaultValue="x" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="x">𝕏 (Twitter)</TabsTrigger>
                    <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                </TabsList>

                {/* X (Twitter) Preview */}
                <TabsContent value="x" className="mt-4">
                    <Card className="overflow-hidden border-gray-200 shadow-sm">
                        {/* Mobile device frame */}
                        <div className="bg-gradient-to-b from-gray-50 to-white p-4">
                            {/* Tweet card */}
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                {/* Author info */}
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl flex-shrink-0">
                                        {authorAvatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold text-gray-900 text-sm">
                                                {authorName}
                                            </span>
                                            <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                                            </svg>
                                        </div>
                                        <div className="text-gray-500 text-xs">{authorHandle}</div>
                                    </div>
                                    <div className="text-gray-400 text-xs">{timeString}</div>
                                </div>

                                {/* Tweet content */}
                                <div className="mb-3">
                                    <p className="text-gray-900 text-sm whitespace-pre-wrap break-words leading-relaxed">
                                        {content || 'Your post will appear here...'}
                                    </p>
                                </div>

                                {/* Engagement buttons */}
                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                                        <MessageCircle className="w-4 h-4" />
                                        <span className="text-xs">42</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors">
                                        <Repeat2 className="w-4 h-4" />
                                        <span className="text-xs">128</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                                        <Heart className="w-4 h-4" />
                                        <span className="text-xs">1.2K</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                                        <Share className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </TabsContent>

                {/* LinkedIn Preview */}
                <TabsContent value="linkedin" className="mt-4">
                    <Card className="overflow-hidden border-gray-200 shadow-sm">
                        <div className="bg-gradient-to-b from-gray-50 to-white p-4">
                            {/* LinkedIn post card */}
                            <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
                                {/* Author info */}
                                <div className="p-4">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-xl flex-shrink-0">
                                            {authorAvatar}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-gray-900 text-sm">
                                                {authorName}
                                            </div>
                                            <div className="text-gray-600 text-xs">
                                                Tech Founder & Leader
                                            </div>
                                            <div className="text-gray-500 text-xs flex items-center gap-1">
                                                {timeString} • 🌐
                                            </div>
                                        </div>
                                    </div>

                                    {/* Post content */}
                                    <div className="mb-3">
                                        <p className="text-gray-900 text-sm whitespace-pre-wrap break-words leading-relaxed">
                                            {content || 'Your post will appear here...'}
                                        </p>
                                    </div>
                                </div>

                                {/* Engagement stats */}
                                <div className="px-4 pb-2">
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <div className="flex -space-x-1">
                                            <div className="w-4 h-4 rounded-full bg-blue-500 border border-white flex items-center justify-center">
                                                <ThumbsUp className="w-2 h-2 text-white" />
                                            </div>
                                            <div className="w-4 h-4 rounded-full bg-green-500 border border-white"></div>
                                        </div>
                                        <span>245</span>
                                    </div>
                                </div>

                                {/* Engagement buttons */}
                                <div className="border-t border-gray-200 px-2 py-1">
                                    <div className="flex items-center justify-around">
                                        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                                            <ThumbsUp className="w-5 h-5" />
                                            <span className="text-sm font-medium">Like</span>
                                        </button>
                                        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                                            <MessageCircle className="w-5 h-5" />
                                            <span className="text-sm font-medium">Comment</span>
                                        </button>
                                        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                                            <Share2 className="w-5 h-5" />
                                            <span className="text-sm font-medium">Share</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
