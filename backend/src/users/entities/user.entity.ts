import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    avatar: string;

    // X (Twitter) OAuth
    @Column({ nullable: true, name: 'x_access_token' })
    xAccessToken: string;

    @Column({ nullable: true, name: 'x_refresh_token' })
    xRefreshToken: string;

    @Column({ nullable: true, name: 'x_user_id' })
    xUserId: string;

    // LinkedIn OAuth
    @Column({ nullable: true, name: 'linkedin_access_token' })
    linkedinAccessToken: string;

    @Column({ nullable: true, name: 'linkedin_refresh_token' })
    linkedinRefreshToken: string;

    @Column({ nullable: true, name: 'linkedin_user_id' })
    linkedinUserId: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
