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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { SchedulePostDto } from './dto/schedule-post.dto';
import { Post } from './entities/post.entity';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @HttpPost()
    @ApiOperation({ summary: 'Create a new post draft' })
    @ApiResponse({ status: 201, description: 'The post has been successfully created.', type: Post })
    async createDraft(@Body() createPostDto: CreatePostDto): Promise<Post> {
        return this.postsService.createDraft(createPostDto);
    }

    @HttpPost(':id/schedule')
    @ApiOperation({ summary: 'Schedule a post' })
    @ApiResponse({ status: 200, description: 'The post has been scheduled.', type: Post })
    async schedulePost(
        @Param('id') id: string,
        @Body() scheduleDto: SchedulePostDto,
    ): Promise<Post> {
        return this.postsService.schedulePost(id, scheduleDto);
    }

    @HttpPost(':id/publish')
    @ApiOperation({ summary: 'Publish a post immediately' })
    @ApiResponse({ status: 200, description: 'The post has been published.', type: Post })
    async publishNow(@Param('id') id: string): Promise<Post> {
        return this.postsService.publishNow(id);
    }

    @Get()
    @ApiOperation({ summary: 'Get all posts for a user' })
    @ApiResponse({ status: 200, description: 'Return all posts.', type: [Post] })
    async findAll(@Query('userId') userId: string): Promise<Post[]> {
        return this.postsService.findAll(userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a post by id' })
    @ApiResponse({ status: 200, description: 'Return the post.', type: Post })
    @ApiResponse({ status: 404, description: 'Post not found.' })
    async findOne(@Param('id') id: string): Promise<Post> {
        return this.postsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a post' })
    @ApiResponse({ status: 200, description: 'The post has been updated.', type: Post })
    async updatePost(
        @Param('id') id: string,
        @Body() updateData: Partial<Post>,
    ): Promise<Post> {
        return this.postsService.updatePost(id, updateData);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a post' })
    @ApiResponse({ status: 200, description: 'The post has been deleted.' })
    async deletePost(@Param('id') id: string): Promise<{ message: string }> {
        await this.postsService.deletePost(id);
        return { message: 'Post deleted successfully' };
    }
}
