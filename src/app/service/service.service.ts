import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  // HTTP HeadersOption
  // httpOptions = {
  //   headers: new HttpHeaders({ ContentType: 'application/json' })
  // };
  // headers = new HttpHeaders({ 'Content-Type': 'applications/form-data' });
  // httpOption = { headers: this.headers };

  email: any;
  api = 'https://restcountries.eu/rest/v2/all';

  /**
   *  Initialize firebase database
   */
  firedata = firebase.database().ref('/users');

  constructor(private router: Router, private http: HttpClient) { }

  public loggedIn = JSON.parse(localStorage.getItem('token') || 'false');

  /**
   *  Sign-up method
   */
  signUp(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err)
      );
    });
  }

  /*
  * Login method
   */
  login(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err)
      );
    });
  }


  /*
  * Logout method
   */
  logout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut()
        .then(() => {
          this.router.navigate(['/login']);
          resolve();
        });
      }
    });
  }

  /**
   * Check if the user is logged in
   */
  isLoggedIn() {
    return this.loggedIn;
  }

  /**
   *  Get countries methods
   */
  getCountries() {
    return this.http.get(this.api);
  }

}
