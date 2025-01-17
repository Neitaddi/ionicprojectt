import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

// import { Firestore, collectionData, docData } from '@angular/fire/firestore';
// import { userInfo } from 'os';
import { User } from 'firebase/auth';
export interface Users {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AutheticationService {
  constructor(public ngFireAuth: AngularFireAuth) {}

  async registerUser(email: string, password: string, name: string) {
    return await this.ngFireAuth.createUserWithEmailAndPassword(
      email,
      password
    );
  }

  async loginUser(email: string, password: string) {
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  async resetPassword(email: string) {
    return await this.ngFireAuth.sendPasswordResetEmail(email);
  }
  async signOut() {
    return await this.ngFireAuth.signOut();
  }

  async getProfile(): Promise<User | null> {
    return new Promise<User | null>((resolve, reject) => {
      this.ngFireAuth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user as User);
        } else {
          resolve(null);
        }
      }, reject);
    });
  }
}
