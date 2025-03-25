import { auth, googleProvider } from '../service/firebaseConfig';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

export const authService = {
  // Sign in with Google
  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      return {
        sub: user.uid,
        name: user.displayName,
        email: user.email,
        picture: user.photoURL
      };
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  },

  // Sign out
  async signOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  // Listen to auth state changes
  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        callback({
          sub: user.uid,
          name: user.displayName,
          email: user.email,
          picture: user.photoURL
        });
      } else {
        callback(null);
      }
    });
  }
}; 