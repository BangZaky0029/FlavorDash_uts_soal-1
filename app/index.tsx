import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// Modules / Components
import { FoodCard } from '../src/components/FoodCard';
import { ListHeader } from '../src/components/ListHeader';

// Logic / Hooks
import { useFoods } from '../src/hooks/useFoods';
import { useAuth } from '../src/context/AuthContext';

// Styles
import { styles } from '../src/styles/FlavorDashStyles';

const ItemSeparator: React.FC = () => <View style={styles.separator} />;

export default function IndexScreen() {
  const { foods, loading, error } = useFoods();
  const { token, signOut } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="large" color="#f97316" />
          <Text style={styles.loadingText}>Memuat sajian laut...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
        <View style={styles.errorWrapper}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Gagal Memuat Data</Text>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      {/* Header Aplikasi */}
      <View style={styles.appHeader}>
        <View style={styles.appHeaderContent}>
          <Text style={styles.appTitle}>🔥 FlavorDash</Text>
          <Text style={styles.appSubtitle}>Temukan Kuliner Terbaikmu</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>{foods.length}</Text>
          </View>
          {token ? (
            <TouchableOpacity onPress={signOut} style={{ padding: 8, backgroundColor: '#ef4444', borderRadius: 8 }}>
              <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Logout</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/detail/${item.id}`)}>
            <FoodCard item={item} />
          </TouchableOpacity>
        )}
        numColumns={1}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={<ListHeader totalItems={foods.length} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Tidak ada menu tersedia 😢</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
