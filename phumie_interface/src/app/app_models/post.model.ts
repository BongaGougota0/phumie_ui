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
    commentId: number;
    commentContent: string;
    commentImage?: string;
    commentDate: Date;
    commentAuthor: string;
}