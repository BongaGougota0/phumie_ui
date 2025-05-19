export interface PhumieUserDto {
    username: string;
    userEmail: string;
    password?: string;
    userRole: string;
    aboutUser: string;
}

export interface LoginCredentials {
    usernameEmail: string;
    password: string;
}