import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/FlavorDashStyles';

interface ListHeaderProps {
  totalItems: number;
}

export const ListHeader: React.FC<ListHeaderProps> = ({ totalItems }) => (
  <View style={styles.listHeader}>
    <Text style={styles.listHeaderTitle}>🍽️ Menu Pilihan</Text>
    <Text style={styles.listHeaderSubtitle}>{totalItems} menu laut tersedia</Text>
  </View>
);
