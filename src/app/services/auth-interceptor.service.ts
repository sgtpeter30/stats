import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { UserService } from "./user.service"

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
  constructor(
    @Inject('BASE_API_URL') 
    private baseUrl: string,
    private userService: UserService
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler){
    const authToken = this.userService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer "+ authToken),
      url: `${this.baseUrl}/${req.url}`
    });
    return next.handle(authRequest);
  }
}
