import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';


export const userGuard: CanActivateFn = (route, state) => {
  const login=inject(LoginService)
  const router=inject(Router)
  if(login.isLoggenIn() && login.getUserRole()=="NORMAL")return true;

  router.navigate(['/store'])
  return false;
};
