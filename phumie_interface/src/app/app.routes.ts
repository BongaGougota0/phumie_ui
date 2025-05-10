import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication_components/login/login.component';
import { SignupComponent } from './authentication_components/signup/signup.component';
import { PhumieIndexComponent } from './phumie-index/phumie-index.component';

export const routes: Routes = [
    {path: "", component: PhumieIndexComponent},
    {path: "login", component: LoginComponent},
    {path: "signup", component: SignupComponent}
];
