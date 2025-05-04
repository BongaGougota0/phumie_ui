import { User } from "./user.model";

export interface LoginSuccess {
    user: User;
    jwt: string;
}