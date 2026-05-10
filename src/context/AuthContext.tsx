import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Mengecek apakah ada token saat aplikasi pertama kali dimuat
    const loadToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync('userToken');
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Gagal memuat token dari SecureStore', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadToken();
  }, []);

  const signIn = async () => {
    try {
      // Mock JWT generation (Stateless Auth)
      // Dalam aplikasi nyata, ini adalah response dari backend server (misal Node.js/Python)
      const mockJwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJpYXQiOjE2ODcy...';
      await SecureStore.setItemAsync('userToken', mockJwtToken);
      setToken(mockJwtToken);
    } catch (error) {
      console.error('Gagal menyimpan token', error);
    }
  };

  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      setToken(null);
    } catch (error) {
      console.error('Gagal menghapus token', error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  return context;
};
