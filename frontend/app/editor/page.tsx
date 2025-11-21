'use client';

import { useState } from 'react';
import { Editor } from '@/components/editor/Editor';
import { ThreadSplitter } from '@/components/editor/ThreadSplitter';
import { MobilePreview } from '@/components/preview/MobilePreview';
import { Button } from '@/components/ui/button';
import { Send, Clock, Save } from 'lucide-react';
import { ScheduleModal } from '@/components/scheduler/ScheduleModal';
import { api } from '@/lib/api/client';

export default function EditorPage() {
    const [content, setContent] = useState('');
    const [platform, setPlatform] = useState<'x' | 'linkedin' | 'both'>('x');
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isPosting, setIsPosting] = useState(false);

    // TODO: Get from user session
    // Using a valid UUID format for demo purposes
    const userId = '00000000-0000-0000-0000-000000000001';

    const handlePostNow = async () => {
        if (!content.trim()) {
            alert('Please enter some content');
            return;
        }

        setIsPosting(true);
        try {
            // Create draft first
            const draft = await api.createDraft({
                content,
                platforms: platform === 'both' ? ['x', 'linkedin'] : [platform],
                userId,
            });

            // Publish immediately
            await api.publishNow(draft.id);

            alert('Post published successfully!');
            setContent('');
        } catch (error) {
            console.error('Failed to post:', error);
            alert('Failed to publish post. Please try again.');
        } finally {
            setIsPosting(false);
        }
    };

    const handleSchedule = () => {
        if (!content.trim()) {
            alert('Please enter some content');
            return;
        }
        setIsScheduleModalOpen(true);
    };

    const handleSaveDraft = async () => {
        if (!content.trim()) {
            alert('Please enter some content');
            return;
        }

        setIsSaving(true);
        try {
            await api.createDraft({
                content,
                platforms: platform === 'both' ? ['x', 'linkedin'] : [platform],
                userId,
            });

            alert('Draft saved successfully!');
        } catch (error) {
            console.error('Failed to save draft:', error);
            alert('Failed to save draft. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">S</span>
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                            Social Scheduler
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Platform selector */}
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setPlatform('x')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${platform === 'x'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                𝕏
                            </button>
                            <button
                                onClick={() => setPlatform('linkedin')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${platform === 'linkedin'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                in
                            </button>
                            <button
                                onClick={() => setPlatform('both')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${platform === 'both'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Both
                            </button>
                        </div>

                        <Button variant="outline" size="sm" onClick={handleSaveDraft}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Draft
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleSchedule}>
                            <Clock className="w-4 h-4 mr-2" />
                            Schedule
                        </Button>
                        <Button size="sm" onClick={handlePostNow} className="bg-blue-600 hover:bg-blue-700">
                            <Send className="w-4 h-4 mr-2" />
                            Post Now
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Editor Section */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Compose
                            </h2>
                            <Editor content={content} onChange={setContent} platform={platform} />
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="space-y-6">
                        {/* Thread Preview */}
                        {content && (
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                                <ThreadSplitter
                                    content={content}
                                    charLimit={platform === 'linkedin' ? 3000 : 280}
                                />
                            </div>
                        )}

                        {/* Mobile Preview */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Mobile Preview
                            </h2>
                            <MobilePreview content={content} />
                        </div>
                    </div>
                </div>
            </main>

            {/* Schedule Modal */}
            <ScheduleModal
                open={isScheduleModalOpen}
                onOpenChange={setIsScheduleModalOpen}
                content={content}
                platform={platform}
            />
        </div>
    );
}
