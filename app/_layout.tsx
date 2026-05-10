import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

const InitialLayout = () => {
  const { token, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // Mendapatkan segment pertama dari routing saat ini
    const inDetailGroup = segments[0] === 'detail';

    // Route Protection Logic / Middleware
    if (!token && inDetailGroup) {
      // Jika mencoba akses detail pesanan tapi belum login, lempar ke login
      router.replace('/login');
    } else if (token && segments[0] === 'login') {
      // Jika sudah login tapi mencoba ke halaman login, kembalikan ke index
      router.replace('/');
    }
  }, [token, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f0f1a' }}>
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" options={{ presentation: 'modal' }} />
      <Stack.Screen name="detail/[id]" options={{ headerShown: true, title: 'Detail Pesanan', headerStyle: { backgroundColor: '#1a1a2e' }, headerTintColor: '#f97316' }} />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
