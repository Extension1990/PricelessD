import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public router: Router, private service: ServiceService) { }

  ngOnInit() {
  }

  /*
      Logout method
*/
  logout() {
    this.service.logout()
    .then(res => {
      this.router.navigate(['/login']);
    });
  }

}
