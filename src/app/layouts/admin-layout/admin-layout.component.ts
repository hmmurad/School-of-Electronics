import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/firebase/auth.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <aside class="hidden md:flex flex-col w-64 bg-gray-900 text-white min-h-screen fixed left-0 top-0">
        <div class="h-20 flex items-center px-6 gap-2 font-display font-bold text-xl">
          <span class="material-icons text-2xl text-primary-400">admin_panel_settings</span>
          Admin Panel
        </div>
        
        <nav class="flex-1 px-4 py-6 flex flex-col gap-2">
          <a routerLink="/admin/dashboard" routerLinkActive="bg-gray-800 text-primary-400" [routerLinkActiveOptions]="{exact: true}" class="flex items-center gap-3 px-4 py-3 text-gray-300 font-medium rounded-xl hover:bg-gray-800 transition-colors">
            <span class="material-icons">dashboard</span>
            Dashboard
          </a>
          <a routerLink="/admin/lessons" routerLinkActive="bg-gray-800 text-primary-400" class="flex items-center gap-3 px-4 py-3 text-gray-300 font-medium rounded-xl hover:bg-gray-800 transition-colors">
            <span class="material-icons">menu_book</span>
            Manage Lessons
          </a>
          <a routerLink="/admin/questions" routerLinkActive="bg-gray-800 text-primary-400" class="flex items-center gap-3 px-4 py-3 text-gray-300 font-medium rounded-xl hover:bg-gray-800 transition-colors">
            <span class="material-icons">help_outline</span>
            Manage Q&A
          </a>
          <a routerLink="/admin/users" routerLinkActive="bg-gray-800 text-primary-400" class="flex items-center gap-3 px-4 py-3 text-gray-300 font-medium rounded-xl hover:bg-gray-800 transition-colors">
            <span class="material-icons">people</span>
            Users
          </a>
        </nav>
        
        <div class="p-4 border-t border-gray-800">
          <button (click)="logout()" class="w-full flex items-center gap-3 px-4 py-3 text-gray-300 font-medium rounded-xl hover:bg-gray-800 hover:text-white transition-colors">
            <span class="material-icons">logout</span>
            Logout
          </button>
        </div>
      </aside>
      
      <main class="flex-1 md:ml-64 relative">
        <div class="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `
})
export class AdminLayoutComponent {
  authService = inject(AuthService);
  
  logout() {
    this.authService.logout();
  }
}
