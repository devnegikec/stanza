import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { SchedulerService } from './scheduler.service';
import { PostsProcessor } from './posts.processor';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'posts',
        }),
    ],
    providers: [SchedulerService, PostsProcessor],
    exports: [SchedulerService],
})
export class SchedulerModule { }
