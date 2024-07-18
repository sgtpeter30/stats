import { Injectable, inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class PermissionsService {

  constructor(
    private userService : UserService,
  ){}
  public isLogged(): boolean {
    const userToken = this.userService.getToken()
    return userToken ? true : false
  }
  canActivate(): boolean {
    return true;
  }
  canMatch(): boolean {
    return true;
  }
}

export const userLogged: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
)=>{
  return inject(PermissionsService).isLogged();
}