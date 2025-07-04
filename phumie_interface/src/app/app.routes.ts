import { Routes } from '@angular/router';
import { LoginComponent } from './auth_components/login/login.component';
import { SignupComponent } from './auth_components/signup/signup.component';
import { PhumieIndexComponent } from './phumie-index/phumie-index.component';
import { USER_AUTHENTICATED_ROUTES } from './authenticated_user/authenticated_user_routes';

export const routes: Routes = [
    {path: "", component: PhumieIndexComponent},
    {path: "login", component: LoginComponent},
    {path: "signup", component: SignupComponent},
    ...USER_AUTHENTICATED_ROUTES
];
