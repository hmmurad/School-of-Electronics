import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/firebase/auth.service';

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <!-- Desktop Sidebar -->
      <aside class="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 min-h-screen fixed left-0 top-0 z-20">
        <div class="h-20 flex items-center px-6 gap-2 text-primary-600 font-display font-bold text-xl">
          <span class="material-icons text-2xl">school</span>
          QuizMe
        </div>
        
        <nav class="flex-1 px-4 py-6 flex flex-col gap-2">
          <a routerLink="/dashboard" routerLinkActive="bg-primary-50 text-primary-700" [routerLinkActiveOptions]="{exact: true}" class="flex items-center gap-3 px-4 py-3 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors">
            <span class="material-icons">grid_view</span>
            Dashboard
          </a>
          <a routerLink="/lessons" routerLinkActive="bg-primary-50 text-primary-700" class="flex items-center gap-3 px-4 py-3 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors">
            <span class="material-icons">menu_book</span>
            Lessons
          </a>
          <a routerLink="/exams" routerLinkActive="bg-primary-50 text-primary-700" class="flex items-center gap-3 px-4 py-3 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors">
            <span class="material-icons">quiz</span>
            Exams
          </a>
          <a routerLink="/question-bank" routerLinkActive="bg-primary-50 text-primary-700" class="flex items-center gap-3 px-4 py-3 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors">
            <span class="material-icons">library_books</span>
            Question Bank
          </a>
        </nav>
        
        <div class="p-4 border-t border-gray-100">
          <button (click)="logout()" class="w-full flex items-center gap-3 px-4 py-3 text-gray-600 font-medium rounded-xl hover:bg-red-50 hover:text-red-700 transition-colors">
            <span class="material-icons">logout</span>
            Logout
          </button>
        </div>
      </aside>

      <!-- Mobile Sidebar (Drawer) -->
      @if (mobileMenuOpen()) {
        <div class="md:hidden fixed inset-0 z-30 flex">
          <!-- Backdrop -->
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" (click)="toggleMobileMenu()"></div>
          
          <aside class="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div class="absolute top-0 right-0 -mr-12 pt-4">
              <button class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white text-white" (click)="toggleMobileMenu()">
                <span class="material-icons">close</span>
              </button>
            </div>
            
            <div class="h-20 flex items-center px-6 gap-2 text-primary-600 font-display font-bold text-xl border-b border-gray-100">
              <span class="material-icons text-2xl">school</span>
              QuizMe
            </div>
            
            <nav class="flex-1 px-4 py-6 flex flex-col gap-2 overflow-y-auto">
              <a routerLink="/dashboard" routerLinkActive="bg-primary-50 text-primary-700" [routerLinkActiveOptions]="{exact: true}" (click)="toggleMobileMenu()" class="flex items-center gap-3 px-4 py-3 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors">
                <span class="material-icons">grid_view</span>
                Dashboard
              </a>
              <a routerLink="/lessons" routerLinkActive="bg-primary-50 text-primary-700" (click)="toggleMobileMenu()" class="flex items-center gap-3 px-4 py-3 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors">
                <span class="material-icons">menu_book</span>
                Lessons
              </a>
              <a routerLink="/exams" routerLinkActive="bg-primary-50 text-primary-700" (click)="toggleMobileMenu()" class="flex items-center gap-3 px-4 py-3 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors">
                <span class="material-icons">quiz</span>
                Exams
              </a>
              <a routerLink="/question-bank" routerLinkActive="bg-primary-50 text-primary-700" (click)="toggleMobileMenu()" class="flex items-center gap-3 px-4 py-3 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors">
                <span class="material-icons">library_books</span>
                Question Bank
              </a>
            </nav>
            
            <div class="p-4 border-t border-gray-100">
              <button (click)="logout()" class="w-full flex items-center gap-3 px-4 py-3 text-gray-600 font-medium rounded-xl hover:bg-red-50 hover:text-red-700 transition-colors">
                <span class="material-icons">logout</span>
                Logout
              </button>
            </div>
          </aside>
        </div>
      }
      
      <header class="md:hidden h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sticky top-0 z-10">
        <div class="flex items-center gap-2 text-primary-600 font-display font-bold text-lg">
          <span class="material-icons">school</span>
          QuizMe
        </div>
        <button class="text-gray-500 hover:text-gray-900 focus:outline-none" (click)="toggleMobileMenu()">
          <span class="material-icons text-2xl p-2">menu</span>
        </button>
      </header>

      <main class="flex-1 md:ml-64 relative">
        <div class="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `
})
export class UserLayoutComponent {
  authService = inject(AuthService);
  mobileMenuOpen = signal(false);
  
  toggleMobileMenu() {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }
  
  logout() {
    this.authService.logout();
  }
}
