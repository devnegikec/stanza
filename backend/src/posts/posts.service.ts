import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post, PostStatus, Platform } from './entities/post.entity';
import { SchedulerService } from '../scheduler/scheduler.service';
import { CreatePostDto } from './dto/create-post.dto';
import { SchedulePostDto } from './dto/schedule-post.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>,
        @Inject(forwardRef(() => SchedulerService))
        private schedulerService: SchedulerService,
    ) { }

    async createDraft(createPostDto: CreatePostDto): Promise<Post> {
        const post = this.postsRepository.create({
            ...createPostDto,
            status: PostStatus.DRAFT,
        });
        return this.postsRepository.save(post);
    }

    async schedulePost(postId: string, scheduleDto: SchedulePostDto): Promise<Post> {
        const post = await this.findOne(postId);
        post.scheduledFor = scheduleDto.scheduledFor;
        post.status = PostStatus.SCHEDULED;

        await this.postsRepository.save(post);

        // Add to queue
        await this.schedulerService.schedulePost(post);

        return post;
    }

    async publishNow(postId: string): Promise<Post> {
        const post = await this.findOne(postId);

        // Set to scheduled with immediate execution
        post.scheduledFor = new Date();
        post.status = PostStatus.SCHEDULED;
        await this.postsRepository.save(post);

        // Add to queue with no delay
        await this.schedulerService.schedulePost(post);

        return post;
    }

    async findAll(userId: string): Promise<Post[]> {
        return this.postsRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string): Promise<Post> {
        const post = await this.postsRepository.findOne({ where: { id } });
        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }
        return post;
    }

    async updatePost(id: string, updateData: Partial<Post>): Promise<Post> {
        const post = await this.findOne(id);
        Object.assign(post, updateData);
        return this.postsRepository.save(post);
    }

    async deletePost(id: string): Promise<void> {
        const post = await this.findOne(id);
        await this.postsRepository.remove(post);
    }

    async markAsPublished(id: string, xPostId?: string, linkedinPostId?: string): Promise<Post> {
        const post = await this.findOne(id);
        post.status = PostStatus.PUBLISHED;
        post.publishedAt = new Date();
        if (xPostId) post.xPostId = xPostId;
        if (linkedinPostId) post.linkedinPostId = linkedinPostId;
        return this.postsRepository.save(post);
    }

    async markAsFailed(id: string, errorMessage: string): Promise<Post> {
        const post = await this.findOne(id);
        post.status = PostStatus.FAILED;
        post.errorMessage = errorMessage;
        return this.postsRepository.save(post);
    }
}
