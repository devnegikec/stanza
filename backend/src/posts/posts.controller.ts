import {
    Controller,
    Get,
    Post as HttpPost,
    Body,
    Param,
    Patch,
    Delete,
    Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import type { CreatePostDto, SchedulePostDto } from './posts.service';
import { Post } from './entities/post.entity';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @HttpPost()
    async createDraft(@Body() createPostDto: CreatePostDto): Promise<Post> {
        return this.postsService.createDraft(createPostDto);
    }

    @HttpPost(':id/schedule')
    async schedulePost(
        @Param('id') id: string,
        @Body() scheduleDto: SchedulePostDto,
    ): Promise<Post> {
        return this.postsService.schedulePost(id, scheduleDto);
    }

    @HttpPost(':id/publish')
    async publishNow(@Param('id') id: string): Promise<Post> {
        return this.postsService.publishNow(id);
    }

    @Get()
    async findAll(@Query('userId') userId: string): Promise<Post[]> {
        return this.postsService.findAll(userId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Post> {
        return this.postsService.findOne(id);
    }

    @Patch(':id')
    async updatePost(
        @Param('id') id: string,
        @Body() updateData: Partial<Post>,
    ): Promise<Post> {
        return this.postsService.updatePost(id, updateData);
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string): Promise<{ message: string }> {
        await this.postsService.deletePost(id);
        return { message: 'Post deleted successfully' };
    }
}
