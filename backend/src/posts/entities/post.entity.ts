import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
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
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user_id' })
    userId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column('text')
    content: string;

    @Column({
        type: 'enum',
        enum: PostStatus,
        default: PostStatus.DRAFT,
    })
    status: PostStatus;

    @Column('simple-array')
    platforms: Platform[];

    @Column({ nullable: true, name: 'scheduled_for' })
    scheduledFor: Date;

    @Column({ nullable: true, name: 'published_at' })
    publishedAt: Date;

    @Column({ nullable: true, name: 'x_post_id' })
    xPostId: string;

    @Column({ nullable: true, name: 'linkedin_post_id' })
    linkedinPostId: string;

    @Column({ type: 'text', nullable: true, name: 'error_message' })
    errorMessage: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
