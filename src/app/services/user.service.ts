import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';

export interface User {
  login : string,
  password : string,
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token!: string | null;
  private url: string = "api/auth"

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) { }

  getToken(): string | null {
    if (!this.token) {
      this.token = this.getCacheToken()
    }
    return this.token;
  };

  getCacheToken(): string | null {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("goodCookie="))
      ?.split("=")[1];
    return cookieValue ? cookieValue : null
  }

  cacheToken(token: string) {
    const expireDate = (new Date(Date.now() + 3600 * 1000)).toUTCString();
    document.cookie = `goodCookie=${token};expires=${expireDate};path=/;secure;samesite;`
  }

  loginUser(authData: User) {
    return lastValueFrom(this.http.post<{ token: string }>(`${this.url}/signin`, authData))
      .then(response => {
        const token = response.token;
        this.token = token;
        this.cacheToken(token)
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Pomyślnie zalogowano!'});
        this.router.navigate(["/statistics"]);
        return response
      })
      .catch(err => {
        // this.messageService.add({severity:'error', summary: 'Error', detail: err.error.message});
        this.messageService.add({severity:'error', summary: 'Error', detail: err.error.message});
        console.log(err)
        return err
      })
  }
}
