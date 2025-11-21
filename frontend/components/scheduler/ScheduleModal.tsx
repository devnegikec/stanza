'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { api } from '@/lib/api/client';

interface ScheduleModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    content: string;
    platform: 'x' | 'linkedin' | 'both';
}

export function ScheduleModal({ open, onOpenChange, content, platform }: ScheduleModalProps) {
    const [date, setDate] = useState<Date>();
    const [time, setTime] = useState('12:00');
    const [isScheduling, setIsScheduling] = useState(false);

    // TODO: Get from user session
    // Using a valid UUID format for demo purposes
    const userId = '00000000-0000-0000-0000-000000000001';

    const handleSchedule = async () => {
        if (!date) {
            alert('Please select a date');
            return;
        }

        const [hours, minutes] = time.split(':');
        const scheduledDate = new Date(date);
        scheduledDate.setHours(parseInt(hours), parseInt(minutes));

        setIsScheduling(true);
        try {
            // Create draft first
            const draft = await api.createDraft({
                content,
                platforms: platform === 'both' ? ['x', 'linkedin'] : [platform],
                userId,
            });

            // Schedule the post
            await api.schedulePost(draft.id, {
                scheduledFor: scheduledDate.toISOString(),
            });

            alert(`Post scheduled for ${format(scheduledDate, 'PPpp')}`);
            onOpenChange(false);
        } catch (error) {
            console.error('Failed to schedule post:', error);
            alert('Failed to schedule post. Please try again.');
        } finally {
            setIsScheduling(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Schedule Post</DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Date Picker */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Select Date</label>
                        <div className="flex justify-center">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                disabled={(date) => date < new Date()}
                                className="rounded-md border"
                            />
                        </div>
                    </div>

                    {/* Time Picker */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Select Time</label>
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5 text-gray-500" />
                            <Input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="flex-1"
                            />
                        </div>
                    </div>

                    {/* Selected Date/Time Display */}
                    {date && (
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm text-blue-900">
                                <span className="font-medium">Scheduled for: </span>
                                {format(date, 'MMMM d, yyyy')} at {time}
                            </p>
                        </div>
                    )}

                    {/* Platform Display */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                            <span className="font-medium">Posting to: </span>
                            {platform === 'both' ? 'X and LinkedIn' : platform === 'x' ? 'X (Twitter)' : 'LinkedIn'}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSchedule}
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                            disabled={!date}
                        >
                            Schedule Post
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
