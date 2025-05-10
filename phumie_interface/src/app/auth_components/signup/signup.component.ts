import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../app_services/authentication.service';

@Component({
  selector: 'app-signup',
  imports: [RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: '../login/login.component.css'
})
export class SignupComponent {
  signUpForm!: FormGroup;

  constructor(private authService: AuthenticationService, private fb: FormBuilder){
    this.signUpForm = this.fb.group({
      username: ['', [Validators.min(4), Validators.max(14)]],
      userEmail: ['', [Validators.email]],
      password: ['', [Validators.min(8), Validators.max(14)]]
    })
  }

  signUpUser()
  {
    if(!this.signUpForm.valid){return;}

    this.authService.login
  }
}
