export interface Post {
    post_id: number;
    author: string;
    post_content: string;
    post_image?: string;
    post_date: Date;
    likes_count: number;
    post_comments: Comment[];
}

export interface Comment {
    comment_id: number;
    comment_content: string;
    comment_image?: string;
    comment_date: Date;
    comment_author_name: string;
}