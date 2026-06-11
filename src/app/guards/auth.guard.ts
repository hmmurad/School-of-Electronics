import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/firebase/auth.service';
import { auth } from '../core/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function waitForAuth(): Promise<void> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      unsubscribe();
      resolve();
    });
  });
}

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.currentUser() === undefined) {
    await waitForAuth();
    await new Promise(r => setTimeout(r, 500));
  }
  
  if (authService.currentUser()) {
    return true;
  }
  
  return router.parseUrl('/login');
};

export const adminGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.currentUser() === undefined) {
    await waitForAuth();
    await new Promise(r => setTimeout(r, 500));
  }
  
  const user = authService.currentUser();
  if (user && user.role === 'admin') {
    return true;
  }
  
  return router.parseUrl('/dashboard');
};
