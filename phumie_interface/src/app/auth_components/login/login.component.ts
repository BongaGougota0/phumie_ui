import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../app_services/authentication.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { JwtService } from '../../app_services/jwt.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(private router: Router, private authService: AuthenticationService,
              private fb: FormBuilder, private jwtService: JwtService){
    this.loginForm = this.fb.group({
      usernameEmail: ['', [Validators.max(4), Validators.max(15)]],
      password: ['', [Validators.min(6), Validators.max(12), Validators.required]]
    })
  }

  ngOnInit() {
    const tokenExists = localStorage.getItem('jwt_key');
    if(tokenExists && !this.jwtService.isTokenExpired(tokenExists)){
      const userData = this.jwtService.extractUserDataFromToken(tokenExists);
      this.authService.handleAuthSuccess({"jwt": tokenExists, "phumieUserDto":userData})
      this.router.navigate(['/feed']);
    }
  }

  loginSubmit()
  {
    if(!this.loginForm.valid){return};
      
    this.authService.login(this.loginForm.value).subscribe(
      {
        next: (resp) => {
          this.router.navigate(['/feed']);
        },
        error: (err) => {
          console.log(`Error authenticating user ${err}`);
        }
      }
    )
  }

}
