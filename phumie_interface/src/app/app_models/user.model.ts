export interface UserRegisterDetails {
    username: string;
    email: string;
    password: string;
}

export interface UserLoginDetails {
    email: string;
    password: string;
}

export interface User {
    user_id: number;
    username: string;
    email: string;
}