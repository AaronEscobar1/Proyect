import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../shared/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private KEY: string = 'auth';

  constructor(private router: Router, private httpServices: HttpService) { }

  authenticateUser(user: string, password: any): boolean {
    // Usuario cableado para hacer la conexion
    const userLogin = { name: 'jramirez', password: '858915f1d2d425959fd4da867ba6b599' };
    if (user === userLogin.name && password === userLogin.password) {
      return true;
    }
    return false;
  }

  getToken(): string | undefined {
    const auth = this.getAuth();
    return auth ? auth.token : undefined;
  }

  setToken(token: string): void {
    const auth = this.getAuth();
    if (auth) {
      auth.token = token;
      this.setAuth(auth);
    }
  }

  getAuth(): any | null {
    const auth = sessionStorage.getItem(this.KEY);
    return auth ? JSON.parse(auth) : null;
  }

  setAuth(data: any): void {
    sessionStorage.setItem(this.KEY, JSON.stringify(data));
  }

  closeSession(): void {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
