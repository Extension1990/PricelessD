import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private router: Router, private service: ServiceService) {}

  canActivate(): boolean {
    if (this.service.isLoggedIn()) {
        return true;
    } else {
    this.router.navigate(['/login']);
    return false;
  }
}

}
