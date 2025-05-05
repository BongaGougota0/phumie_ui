export interface Post {
    post_id: number;
    author: string;
    post_content: string;
    post_image?: string;
    post_date: Date;
    likes_count: number;
    post_comments: Comment[];

    // added to update feed post display
    like: boolean; // if true cannot like again, else make like button active.
}

export interface Comment {
    comment_id: number;
    comment_content: string;
    comment_image?: string;
    comment_date: Date;
    comment_author_name: string;
}