import { createContext, useContext, useState, useEffect } from 'react';
  import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
  import { initializeApp } from 'firebase/app';

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const AuthContext = createContext();

  export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          setUser({ email: firebaseUser.email, uid: firebaseUser.uid });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return unsubscribe;
    }, []);

    const loginWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const idToken = await result.user.getIdToken();
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google-login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_token: idToken }),
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.access_token);
          setUser({ email: result.user.email, uid: result.user.uid });
        }
      } catch (error) {
        console.error('Google login error:', error);
        throw error;
      }
    };

    const loginWithEmail = async (email, password) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.access_token);
          setUser({ email });
        } else {
          throw new Error(data.message || 'Login failed');
        }
      } catch (error) {
        console.error('Email login error:', error);
        throw error;
      }
    };

    const register = async (username, email, password) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.access_token);
          setUser({ email });
        } else {
          throw new Error(data.message || 'Registration failed');
        }
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    };

    const logout = async () => {
      try {
        await auth.signOut();
        localStorage.removeItem('token');
        setUser(null);
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

    return (
      <AuthContext.Provider value={{ user, loading, loginWithGoogle, loginWithEmail, register, logout }}>
        {children}
      </AuthContext.Provider>
    );
  }

  export const useAuth = () => useContext(AuthContext);