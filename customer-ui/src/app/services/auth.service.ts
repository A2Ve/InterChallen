import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { Router } from "@angular/router";

// what the login/ register API returns

interface AuthResponse {
  token: string;
  username: string;
  message: string;
}

// what sends for login

interface LoginRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private apiUrl = 'http://localhost:5063/api/auth';
    
    constructor(private http: HttpClient, private router: Router) {}

    //Register new user
    register(username: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/register`, { 
            username, 
            password }).pipe(
                tap(response => this.saveToken(response.token))
            );
    }

    //Login existing user
    login(username: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { 
            username, 
            password }).pipe(
                tap(response => this.saveToken(response.token))
            );
    }
    //Save token to local storage
    private saveToken(token: string): void {
        localStorage.setItem('token', token);
    }
    //Get token from local storage
    getToken(): string | null {
        return localStorage.getItem('token');
    }
    //Check whether user is logged in
    isLoggedIn(): boolean {
        return !!this.getToken();
    }
    //Logout user
    logout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
    
}