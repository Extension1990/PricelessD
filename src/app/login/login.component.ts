import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Users } from '../../app/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   *  Declarations
   */
  Users: Users;
  error: any;
  email: string;
  password: string;
  validationForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  /**
   *  Declarations for error messages
   */
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be atleast 6 characters long.' },
    ],
  };

  constructor( public router: Router, private service: ServiceService, private formBuilder: FormBuilder) {}

  ngOnInit() {

    /**
   *    Initialize validations on page load
   */
    this.validationForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),

      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
    });
  }

  /**
   *  Login method
   */
  login(value) {
    this.service.login(value)
    .then(res => {
      this.errorMessage = '';
      this.router.navigate(['/dashboard']);
    }, err => {
      this.errorMessage = err.message;
    }
    );
  }

}
