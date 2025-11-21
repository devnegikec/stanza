import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { SchedulerModule } from '../scheduler/scheduler.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Post]),
        forwardRef(() => SchedulerModule),
    ],
    controllers: [PostsController],
    providers: [PostsService],
    exports: [PostsService],
})
export class PostsModule { }
