import { Routes } from '@angular/router';
import { CustomersList } from './components/customers-list/customers-list';
import { LoginComponent } from './components/login/login';
import { authGuard } from './guards/auth.guards';

export const routes: Routes = [
    // default route
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    // login page
    { path: 'login', component: LoginComponent },
    // customers page
    { path: 'customers', component: CustomersList, canActivate: [authGuard] },
    // any unknown route go back to login
    { path: '**', redirectTo: '/login' }

];
