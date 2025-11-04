import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.html',
    styleUrl: './login.css',
})
export class LoginComponent {
    errorMessage = '';

    // login form
    loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    constructor(private authService: AuthService, private router: Router) {}

    // handle login form
    onLogin(): void {
        if (this.loginForm.invalid) {
            return;
        }
        
        const username = this.loginForm.value.username!;
        const password = this.loginForm.value.password!;

        this.authService.login(username, password).subscribe({
            next: () => {
                // If successful go to customers page
                this.router.navigate(['/customers']);
            },
            error: (err) => {
                //if not error message:
                this.errorMessage = err.error || 'Login failed. Please try again.';
            }
        });
    }


    // handle register form
    onRegister(): void {
        if (this.loginForm.invalid) {
            return;
        }

        const username = this.loginForm.value.username!;
        const password = this.loginForm.value.password!;

        this.authService.register(username, password).subscribe({
            next: () => {
                // If successful go to customers page
                this.router.navigate(['/customers']);
            },
            error: (err) => {
                //if not error message:
                this.errorMessage = err.error || 'Registration failed. Please try again.';
            }
        });
    }

}