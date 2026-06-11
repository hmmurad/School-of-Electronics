import { Injectable, signal } from '@angular/core';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface AppUser {
  uid: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
  createdAt: number;
  updatedAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly provider = new GoogleAuthProvider();
  
  currentUser = signal<AppUser | null | undefined>(undefined);
  
  constructor() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            this.currentUser.set(userDoc.data() as AppUser);
          } else {
            // Wait to verify if not just created
            if (this.currentUser() === undefined || this.currentUser()?.uid !== user.uid) {
               // Provide fallback or wait?
               // The safest is to set the user state based on auth user and let register update it later
               if (!this.currentUser()) {
                 this.currentUser.set({
                    uid: user.uid,
                    name: user.displayName || 'User',
                    email: user.email || '',
                    role: 'student',
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                 });
               }
            }
          }
        } catch (e) {
          console.error(e);
          if (this.currentUser() === undefined) {
             this.currentUser.set(null);
          }
        }
      } else {
        this.currentUser.set(null);
      }
    });
  }

  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, this.provider);
      const user = result.user;
      
      const newUser: AppUser = {
        uid: user.uid,
        name: user.displayName || 'Unknown',
        email: user.email || '',
        role: 'student',
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
          await setDoc(userRef, newUser);
          this.currentUser.set(newUser);
        } else {
          this.currentUser.set(userSnap.data() as AppUser);
        }
      } catch (dbError) {
        console.warn("Firestore error (likely missing rules), falling back to Auth user data.", dbError);
        this.currentUser.set(newUser);
      }
    } catch (error) {
      console.error('Login error', error);
      throw error;
    }
  }

  async loginWithEmail(email: string, pass: string) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      try {
        const userRef = doc(db, 'users', result.user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          this.currentUser.set(userSnap.data() as AppUser);
        } else {
          this.currentUser.set(null);
        }
      } catch (dbError) {
        console.warn("Firestore error, falling back to Auth user data.", dbError);
        this.currentUser.set({
          uid: result.user.uid,
          name: result.user.displayName || 'User',
          email: result.user.email || email,
          role: 'student',
          createdAt: Date.now(),
          updatedAt: Date.now()
        });
      }
    } catch (error) {
      console.error('Login error', error);
      throw error;
    }
  }

  async registerWithEmail(name: string, email: string, pass: string) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(result.user, { displayName: name });
      
      const newUser: AppUser = {
        uid: result.user.uid,
        name: name,
        email: email,
        role: 'student',
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      
      try {
        await setDoc(doc(db, 'users', result.user.uid), newUser);
      } catch (dbError) {
        console.warn("Firestore error saving new user (likely missing rules).", dbError);
      }
      this.currentUser.set(newUser);
    } catch (error) {
      console.error('Register error', error);
      throw error;
    }
  }

  async logout() {
    await firebaseSignOut(auth);
    this.currentUser.set(null);
  }
}
