export interface Like {
    post_id: number;
    user_id: number;
}

export interface UserLikes {
    user_id: number;
    likes: Like[];
}