import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const { token } = useAuth();
  
  const [mealDetail, setMealDetail] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        // Memanggil endpoint lookup API TheMealDB berdasarkan ID melalui .env
        const baseDetailUrl = process.env.EXPO_PUBLIC_API_DETAIL_URL || 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
        const res = await fetch(`${baseDetailUrl}${id}`);
        if (!res.ok) throw new Error('Gagal memuat data');
        
        const data = await res.json();
        if (data.meals && data.meals.length > 0) {
          setMealDetail(data.meals[0]);
        } else {
          setError('Data pesanan tidak ditemukan');
        }
      } catch (err) {
        setError('Terjadi kesalahan jaringan');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#f97316" />
        <Text style={styles.loadingText}>Mengambil detail pesanan rahasia...</Text>
      </View>
    );
  }

  if (error || !mealDetail) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* ── Status Proteksi ── */}
      <View style={styles.authBanner}>
        <Text style={styles.authText}>🔓 Akses Diberikan (Stateless JWT Valid)</Text>
      </View>

      {/* ── Detail Makanan dari API ── */}
      <Image source={{ uri: mealDetail.strMealThumb }} style={styles.image} />
      
      <View style={styles.card}>
        <View style={styles.badgeContainer}>
          <Text style={styles.categoryBadge}>{mealDetail.strCategory}</Text>
          <Text style={styles.areaBadge}>{mealDetail.strArea}</Text>
        </View>

        <Text style={styles.title}>{mealDetail.strMeal}</Text>
        <Text style={styles.idText}>Menu ID: #{mealDetail.idMeal}</Text>

        <View style={styles.separator} />

        <Text style={styles.sectionTitle}>Rincian Pesanan:</Text>
        
        <View style={styles.orderRow}>
          <Text style={styles.orderLabel}>Harga per porsi</Text>
          <Text style={styles.orderValue}>Rp {(((parseInt(mealDetail.idMeal) || 0) % 50 + 25) * 1000).toLocaleString('id-ID')}</Text>
        </View>

        <View style={styles.orderRow}>
          <Text style={styles.orderLabel}>Jumlah Pesanan</Text>
          <Text style={styles.orderValue}>1 porsi</Text>
        </View>
        
        <View style={styles.orderRow}>
          <Text style={styles.orderLabel}>Biaya Layanan</Text>
          <Text style={styles.orderValue}>Rp 2.000</Text>
        </View>

        <View style={styles.separator} />
        
        <View style={styles.orderRowTotal}>
          <Text style={styles.totalLabel}>Total Pembayaran</Text>
          <Text style={styles.totalValue}>Rp {((((parseInt(mealDetail.idMeal) || 0) % 50 + 25) * 1000) + 2000).toLocaleString('id-ID')}</Text>
        </View>
      </View>

      {/* ── Info JWT ── */}
      <View style={styles.tokenContainer}>
        <Text style={styles.tokenTitle}>Sesi Token Anda:</Text>
        <Text style={styles.tokenBox} numberOfLines={2}>
          {token}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    backgroundColor: '#0f0f1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#9ca3af',
    marginTop: 12,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  content: {
    paddingBottom: 40,
  },
  authBanner: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#10b981',
  },
  authText: {
    color: '#10b981',
    fontWeight: 'bold',
    fontSize: 12,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  card: {
    backgroundColor: '#1e1e30',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2a2a45',
    marginTop: -30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: '#f97316',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  areaBadge: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#f1f5f9',
    marginBottom: 4,
  },
  idText: {
    fontSize: 13,
    color: '#f97316',
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#2a2a45',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: 12,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderLabel: {
    color: '#9ca3af',
    fontSize: 14,
  },
  orderValue: {
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: '500',
  },
  orderRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    color: '#f1f5f9',
    fontSize: 16,
    fontWeight: '700',
  },
  totalValue: {
    color: '#10b981',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tokenContainer: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  tokenTitle: {
    color: '#9ca3af',
    fontSize: 12,
    marginBottom: 4,
  },
  tokenBox: {
    padding: 12,
    backgroundColor: '#1a1a2e',
    color: '#10b981',
    fontFamily: 'monospace',
    borderRadius: 8,
    fontSize: 10,
    borderWidth: 1,
    borderColor: '#10b981',
  },
});
