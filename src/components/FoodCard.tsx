import React from 'react';
import { View, Text, Image } from 'react-native';
import { Food } from '../types/Food';
import { styles } from '../styles/FlavorDashStyles';

interface FoodCardProps {
  item: Food;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  return (
    <View style={styles.cardContainer}>
      {/* 
        Nested View: Kontainer utama item menggunakan flexDirection 'row'
        Gambar di kiri, Teks di kanan
      */}
      <View style={styles.cardInner}>
        {/* ── KIRI: Container Gambar (flex: 1) ── */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.foodImage}
            resizeMode="cover"
          />
        </View>

        {/* ── KANAN: Container Teks (flex: 2) ── */}
        <View style={styles.textContainer}>
          {/* Judul Makanan */}
          <Text style={styles.foodName} numberOfLines={2}>
            {item.name}
          </Text>

          {/* Deskripsi */}
          <Text style={styles.foodDescription} numberOfLines={2}>
            {item.description}
          </Text>

          {/* Harga dan ID (Footer) */}
          <View style={styles.cardFooter}>
            <Text style={styles.foodPrice}>
              Rp {item.price.toLocaleString('id-ID')}
            </Text>
            <View style={styles.idBadge}>
              <Text style={styles.idText}>#{item.id}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
