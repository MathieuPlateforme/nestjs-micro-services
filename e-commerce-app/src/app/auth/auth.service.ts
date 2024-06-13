// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SigninDto, UserRegistrationDTO } from './auth-registration.DTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/orders'; // Remplacez par votre URL d'API

  constructor(private http: HttpClient) {}

  login(signin:SigninDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signin`, signin).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  register(userRegistration:UserRegistrationDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, userRegistration);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
