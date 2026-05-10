import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { useAuth } from '../src/context/AuthContext';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const router = useRouter();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Validasi statis sederhana (contoh: admin / 12345)
    if (username === 'admin' && password === '12345') {
      await signIn();
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/');
      }
    } else {
      Alert.alert("Login Gagal", "Username atau password salah. Coba: admin / 12345");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Autentikasi Diperlukan</Text>
      <Text style={styles.subtitle}>
        Silakan login untuk mengakses halaman detail pesanan.
      </Text>
      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Username (ketik: admin)"
          placeholderTextColor="#6b7280"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password (ketik: 12345)"
          placeholderTextColor="#6b7280"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  form: {
    width: '100%',
    backgroundColor: '#1e1e30',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2a2a45',
  },
  input: {
    backgroundColor: '#0f0f1a',
    color: '#f1f5f9',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2a2a45',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f97316',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#f97316',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
