export interface Post {
    postId?: number;
    userId: number;
    postAuthor: string;
    postContent: string;
    post_image?: string;
    postDate: Date;
    likesCount: number;
    postComments: number;

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