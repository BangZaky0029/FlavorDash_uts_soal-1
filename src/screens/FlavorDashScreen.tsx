import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Modules / Components
import { FoodCard } from '../components/FoodCard';
import { ListHeader } from '../components/ListHeader';

// Logic / Hooks
import { useFoods } from '../hooks/useFoods';

// Styles
import { styles } from '../styles/FlavorDashStyles';

const ItemSeparator: React.FC = () => <View style={styles.separator} />;

export const FlavorDashScreen: React.FC = () => {
  const { foods, loading, error } = useFoods();

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
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>{foods.length}</Text>
        </View>
      </View>

      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FoodCard item={item} />}
        numColumns={1} // Menggunakan list vertikal biasa sesuai syarat UTS
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
};

export default FlavorDashScreen;
