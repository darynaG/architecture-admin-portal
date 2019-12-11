import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
} from '@angular/router';
import {AuthenticationService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    console.log('canActivate', 'URL', url, this.authService.currentUserValue);
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.currentUserValue) {
      return this.checkPermission(url);
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    const navigationExtras: NavigationExtras = {
      queryParams: { returnUrl: url },
      fragment: 'anchor'
    };

    // Navigate to the login page with extras
    this.router.navigate(['/login'], navigationExtras);
    return false;
  }

  checkPermission(url: string) {
    if (url === '/admin') {
      if (this.authService.currentUserValue.username === 'Administrator') {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}

