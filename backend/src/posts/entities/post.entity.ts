import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

export enum PostStatus {
    DRAFT = 'DRAFT',
    SCHEDULED = 'SCHEDULED',
    PUBLISHED = 'PUBLISHED',
    FAILED = 'FAILED',
}

export type Platform = 'x' | 'linkedin';

@Entity('posts')
export class Post {
    @ApiProperty({ example: 'uuid-string', description: 'The unique identifier of the post' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ example: 'uuid-string', description: 'The user ID' })
    @Column({ name: 'user_id' })
    userId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ApiProperty({ example: 'Hello world!', description: 'The content of the post' })
    @Column('text')
    content: string;

    @ApiProperty({ enum: PostStatus, example: PostStatus.DRAFT, description: 'The status of the post' })
    @Column({
        type: 'enum',
        enum: PostStatus,
        default: PostStatus.DRAFT,
    })
    status: PostStatus;

    @ApiProperty({ example: ['x', 'linkedin'], description: 'Target platforms' })
    @Column('simple-array')
    platforms: Platform[];

    @ApiProperty({ example: '2023-12-25T10:00:00Z', description: 'Scheduled date and time', required: false })
    @Column({ nullable: true, name: 'scheduled_for' })
    scheduledFor: Date;

    @ApiProperty({ example: '2023-12-25T10:00:00Z', description: 'Published date and time', required: false })
    @Column({ nullable: true, name: 'published_at' })
    publishedAt: Date;

    @ApiProperty({ example: '1234567890', description: 'X (Twitter) Post ID', required: false })
    @Column({ nullable: true, name: 'x_post_id' })
    xPostId: string;

    @ApiProperty({ example: 'urn:li:share:1234567890', description: 'LinkedIn Post ID', required: false })
    @Column({ nullable: true, name: 'linkedin_post_id' })
    linkedinPostId: string;

    @ApiProperty({ example: 'Error message', description: 'Error message if publication failed', required: false })
    @Column({ type: 'text', nullable: true, name: 'error_message' })
    errorMessage: string;

    @ApiProperty({ example: '2023-12-25T10:00:00Z', description: 'Creation date' })
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ApiProperty({ example: '2023-12-25T10:00:00Z', description: 'Last update date' })
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
