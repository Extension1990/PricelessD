import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  countries: any;
  details = {
    name: '',
    capital: '',
    nativeName: '',
    region: '',
    flag: File
  };

  constructor(public router: Router, private service: ServiceService) { }

  ngOnInit() {
    /**
     *  Get countries on page load
     */
    this.getCountries();
  }

  /**
   *  Logout method
   */
  logout() {
    this.service.logout()
    .then(res => {
      this.router.navigate(['/login']);
    });
  }

  /**
   *  Get countries from the service
   */
  getCountries() {
    this.service.getCountries().subscribe(data => {
      this.countries = data;
      console.log(this.countries);
  });
}

// show modal
showModal(country) {
  this.details = country;
}

}
