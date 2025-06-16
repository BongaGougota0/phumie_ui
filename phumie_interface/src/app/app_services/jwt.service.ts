import { Injectable } from '@angular/core';
import { PhumieUserDto } from '../app_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  isTokenExpired(token: string): boolean {
    if (!token) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log(`in method isTokenExpired`);
      console.log(`token is => ${payload}`);
      const currentTime = Math.floor(Date.now() / 1000);
      // Check if token has expired (with 5 minute buffer)
      return payload.exp < (currentTime + 300);
    } catch (error) {
      return true; // can't decode? consider it expired
    }
  }
  
  getTokenFromStorage(): string | null {
    return localStorage.getItem('jwt_key');
  }
  
  setToken(token: string): void {
    localStorage.setItem('jwt_key', token);
  }
  
  removeToken(): void {
    localStorage.removeItem('jwt_key');
  }

  decodeToken(token: string) : PhumieUserDto | null {
    if(!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload as PhumieUserDto;
    }catch(error) {
      return null;
    }
  }

  extractUserDataFromToken(token: string): PhumieUserDto {
    const userData = this.decodeToken(token);
    if (!userData) {
      throw new Error('Invalid or missing token');
    }
    return userData;
  }
}
