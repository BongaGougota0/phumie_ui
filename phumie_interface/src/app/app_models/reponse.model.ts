import { PhumieUserDto } from "./user.model";

export interface ResponseDto {
    microserviceName: string;
    message: string;
    status: string;
    timestamp: Date;
}

export interface AuthenticationDto {
    jwt: string;
    phumieUserDto: PhumieUserDto;
}
