export interface Post {
    postId?: number;
    userId: number;
    postAuthor: string;
    postContent: string;
    postImage?: string;
    postDate: Date;
    postComments?: Comment[];
    commentsCount?: number;
    likesCount?: number;

    // added to update feed post display
    like: boolean; // if true cannot like again, else make like button active.
}

export interface Comment {
    commentId?: number;
    commentContent: string;
    commentImage?: string;
    commentDate: Date;
    commentAuthor: string;
}