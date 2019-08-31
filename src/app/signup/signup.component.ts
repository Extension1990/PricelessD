import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Users } from '../users';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  /**
   *  Declarations for error messages
   */
  Users: Users;
  email: any;
  validationForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  phone: any;
  name: string;

  /**
   *    Declarations for validations
   */
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'phone': [
      { type: 'required', message: 'phone is required.' },
      { type: 'minlength', message: 'Phone number must be 10 characters.' },
    ],
    'name': [
      { type: 'required', message: 'name is required.' },
      { type: 'minlength', message: 'Enter a valid name.' },
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be atleast 6 characters long.' },
    ],
  };

  constructor(private router: Router, private service: ServiceService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    /**
   *    Initialize validations on page load
   */
    this.validationForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),

      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),

      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),

      phone: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required,
        Validators.pattern('^([0-9])')
      ]))
    });
  }

  /**
   *  SignUp method
   */
  signUp(value) {
    this.service.signUp(value)
    .then(res => {
      console.log('success');
      this.errorMessage = '';
      this.successMessage = 'Sign up successful!';
      this.router.navigate(['/login']);
    }, err => {
      this.errorMessage = err.message;
      this.successMessage = '';
    });
  }

}
