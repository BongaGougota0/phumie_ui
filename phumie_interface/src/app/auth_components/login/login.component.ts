import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../app_services/authentication.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private router: Router, private authService: AuthenticationService, private fb: FormBuilder){
    this.loginForm = this.fb.group({
      usernameEmail: ['', [Validators.max(4), Validators.max(15)]],
      password: ['', [Validators.min(6), Validators.max(12), Validators.required]]
    })
  }

  loginSubmit()
  {
    if(!this.loginForm.valid){return};
      
    this.authService.login(this.loginForm.value).subscribe(
      {
        next: (resp) => {
          console.log(`Authentication success, jwt = ${resp.jwt}`);
          this.router.navigate(['/feed']);
        },
        error: (err) => {
          console.log(`Error authenticating user ${err}`);
        }
      }
    )
  }

}
