import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../app_services/authentication.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: '../login/login.component.css'
})
export class SignupComponent {
  signUpForm!: FormGroup;

  constructor(private router: Router, private authService: AuthenticationService, private fb: FormBuilder){
    this.signUpForm = this.fb.group({
      username: ['', [Validators.min(4), Validators.max(14)]],
      userEmail: ['', [Validators.email]],
      password: ['', [Validators.min(8), Validators.max(14)]],
      userRole: 'USER'
    })
  }

  signUpUser()
  {
    if(!this.signUpForm.valid){return;}

    this.authService.signUpUser(this.signUpForm.value).subscribe(
      {
        next: (resp) => {
          this.router.navigate(['feed']);
        },
        error: (err) => {
          console.log(`An error occured. ${err}`);
        }
      }
    )
  }
}
