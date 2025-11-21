const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Post {
    id: string;
    userId: string;
    content: string;
    status: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'FAILED';
    platforms: ('x' | 'linkedin')[];
    scheduledFor?: string;
    publishedAt?: string;
    xPostId?: string;
    linkedinPostId?: string;
    errorMessage?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreatePostDto {
    content: string;
    platforms: ('x' | 'linkedin')[];
    userId: string;
}

export interface SchedulePostDto {
    scheduledFor: string;
}

class ApiClient {
    private async request<T>(
        endpoint: string,
        options?: RequestInit,
    ): Promise<T> {
        const url = `${API_BASE_URL}${endpoint}`;

        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'API request failed');
        }

        return response.json();
    }

    // Posts endpoints
    async createDraft(data: CreatePostDto): Promise<Post> {
        return this.request<Post>('/posts', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async schedulePost(postId: string, data: SchedulePostDto): Promise<Post> {
        return this.request<Post>(`/posts/${postId}/schedule`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async publishNow(postId: string): Promise<Post> {
        return this.request<Post>(`/posts/${postId}/publish`, {
            method: 'POST',
        });
    }

    async getPosts(userId: string): Promise<Post[]> {
        return this.request<Post[]>(`/posts?userId=${userId}`);
    }

    async getPost(postId: string): Promise<Post> {
        return this.request<Post>(`/posts/${postId}`);
    }

    async updatePost(postId: string, data: Partial<Post>): Promise<Post> {
        return this.request<Post>(`/posts/${postId}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async deletePost(postId: string): Promise<void> {
        await this.request<{ message: string }>(`/posts/${postId}`, {
            method: 'DELETE',
        });
    }
}

export const api = new ApiClient();
