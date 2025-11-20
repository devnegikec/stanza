import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';
import { Post } from '../posts/entities/post.entity';

@Injectable()
export class SchedulerService {
    constructor(
        @InjectQueue('posts')
        private postsQueue: Queue,
    ) { }

    async schedulePost(post: Post): Promise<void> {
        const now = new Date();
        const scheduledTime = new Date(post.scheduledFor);
        const delay = Math.max(0, scheduledTime.getTime() - now.getTime());

        await this.postsQueue.add(
            'publish-post',
            {
                postId: post.id,
            },
            {
                delay,
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 5000,
                },
            },
        );

        console.log(`Post ${post.id} scheduled for ${scheduledTime} (delay: ${delay}ms)`);
    }

    async cancelScheduledPost(postId: string): Promise<void> {
        const jobs = await this.postsQueue.getJobs(['waiting', 'delayed']);
        const jobToCancel = jobs.find((job) => job.data.postId === postId);

        if (jobToCancel) {
            await jobToCancel.remove();
            console.log(`Cancelled scheduled post ${postId}`);
        }
    }
}
