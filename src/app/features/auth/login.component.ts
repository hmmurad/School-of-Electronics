import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/firebase/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      
      <!-- Curved Header Background -->
      <div class="absolute top-0 left-1/2 w-[150%] md:w-[120%] -translate-x-1/2 h-[55vh] md:h-[50vh] bg-primary-600 rounded-b-[50%] z-0 shadow-lg"
           style="background: linear-gradient(135deg, #4a6df5 0%, #3b82f6 100%);">
      </div>

      <!-- Content Container -->
      <div class="w-full max-w-sm sm:max-w-md md:max-w-lg px-6 relative z-10 flex flex-col items-center mt-[-5vh] md:mt-0">
        
        <!-- Logo Circle -->
        <div class="w-40 h-40 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center mb-8 border-4 border-transparent bg-clip-padding relative">
          <div class="flex flex-col text-center">
            <div class="relative">
              <span class="text-[2.75rem] leading-none font-extrabold text-[#2a4e9b] tracking-tight font-display">Quiz</span>
              <span class="absolute -bottom-3 right-0 text-xs font-bold text-[#2a4e9b] tracking-[0.2em] font-display">ME</span>
            </div>
          </div>
        </div>

        <!-- Login Form -->
        <div class="w-full bg-white/90 backdrop-blur-md sm:bg-white p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50">
          <form [formGroup]="loginForm" (ngSubmit)="loginEmail()" class="w-full space-y-4">
            
            <div>
              <input type="email" formControlName="email" 
                     class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-gray-900 placeholder-gray-400 font-medium text-sm" 
                     placeholder="Email Address" />
            </div>
            
            <div>
              <input type="password" formControlName="password" 
                     class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-gray-900 placeholder-gray-400 font-medium text-sm" 
                     placeholder="Password" />
            </div>

            <!-- Buttons styled like the image -->
            <button type="submit" [disabled]="loading || loginForm.invalid" 
                    class="w-full py-4 flex justify-center items-center gap-2 bg-[#4a6df5] text-white rounded-2xl font-bold text-base tracking-wide hover:bg-primary-700 transition shadow-md disabled:opacity-70 disabled:cursor-not-allowed mt-4">
              @if (loading) {
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              }
              {{ loading ? 'Logging in...' : 'Login' }}
            </button>

            <button type="button" routerLink="/register" 
                    class="w-full py-4 bg-white border-2 border-[#4a6df5] text-[#4a6df5] rounded-2xl font-bold text-base tracking-wide hover:bg-primary-50 transition mt-3">
              Get Started
            </button>
          </form>
          
          <!-- Google Auth -->
          <div class="mt-6 flex justify-center">
            <button (click)="login()" [disabled]="loading" 
                    class="flex items-center justify-center gap-3 px-6 py-3 w-full bg-white border border-gray-200 rounded-xl text-gray-700 font-semibold text-sm hover:bg-gray-50 transition shadow-sm disabled:opacity-50">
              @if (loading) {
                <svg class="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              } @else {
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" class="w-5 h-5">
              }
              Sign in with Google
            </button>
          </div>
          
          @if (error) {
            <div class="mt-4 p-3 bg-red-50 rounded-xl border border-red-100">
              <p class="text-sm text-red-600 text-center font-medium">{{ error }}</p>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);
  
  loading = false;
  error = '';

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async loginEmail() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.error = '';
    try {
      const { email, password } = this.loginForm.value;
      await this.authService.loginWithEmail(email!, password!);
      await this.redirectUser();
    } catch (err: any) {
      this.error = 'Invalid email or password.';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  async login() {
    this.loading = true;
    this.error = '';
    try {
      await this.authService.loginWithGoogle();
      await this.redirectUser();
    } catch (err: any) {
      this.error = err.message || 'Failed to login';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  private async redirectUser() {
    const user = this.authService.currentUser();
    if (user?.role === 'admin') {
      await this.router.navigate(['/admin', 'dashboard']);
    } else {
      await this.router.navigate(['/dashboard']);
    }
  }
}
