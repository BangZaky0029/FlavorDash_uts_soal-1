/**
 * App.tsx - Entry Point FlavorDash
 * Menggunakan FlavorDashScreen sebagai layar utama aplikasi
 */
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlavorDashScreen from './src/screens/FlavorDashScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <FlavorDashScreen />
    </SafeAreaProvider>
  );
}
