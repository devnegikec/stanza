import { ApiProperty } from '@nestjs/swagger';
import { Platform } from '../entities/post.entity';

export class CreatePostDto {
    @ApiProperty({ example: 'Hello world!', description: 'The content of the post' })
    content: string;

    @ApiProperty({ example: ['x', 'linkedin'], description: 'Target platforms' })
    platforms: Platform[];

    @ApiProperty({ example: 'uuid-string', description: 'The user ID' })
    userId: string;
}
