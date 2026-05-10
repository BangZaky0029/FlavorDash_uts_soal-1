import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#0f0f1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appHeader: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: '5%',
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f97316',
    elevation: 4,
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  appHeaderContent: {
    flex: 1,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#f97316',
    letterSpacing: 1,
  },
  appSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  headerBadge: {
    backgroundColor: '#f97316',
    borderRadius: 20,
    minWidth: 36,
    paddingHorizontal: 8,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBadgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 24,
    paddingHorizontal: '3%',
  },
  listHeader: {
    paddingVertical: 16,
    paddingHorizontal: '2%',
    marginBottom: 8,
  },
  listHeaderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f1f5f9',
  },
  listHeaderSubtitle: {
    fontSize: 13,
    color: '#9ca3af',
    marginTop: 4,
  },
  
  // ── Kartu Makanan (Sesuai Persyaratan UTS) ──
  cardContainer: {
    backgroundColor: '#1e1e30',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#2a2a45',
    height: 140, // FIX: Memberikan tinggi absolut agar gambar tidak merusak layout
  },
  cardInner: {
    flexDirection: 'row', // Wajib: Baris (Kiri-Kanan)
    flex: 1,
  },
  
  // ── Container Gambar (KIRI) ──
  imageContainer: {
    flex: 1, // Wajib: Skala Proporsional
    backgroundColor: '#2a2a45',
  },
  foodImage: {
    width: '100%',
    height: '100%',
  },

  // ── Container Teks (KANAN) ──
  textContainer: {
    flex: 2, // Wajib: Skala Proporsional
    padding: 12,
    justifyContent: 'space-between',
  },
  foodName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f1f5f9',
    lineHeight: 22,
  },
  foodDescription: {
    fontSize: 12,
    color: '#9ca3af',
    lineHeight: 18,
    marginTop: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  foodPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#f97316',
  },
  idBadge: {
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#f97316',
  },
  idText: {
    color: '#f97316',
    fontSize: 10,
    fontWeight: 'bold',
  },

  // ── Separator ──
  separator: {
    height: 16,
  },

  // ── UI States ──
  loadingWrapper: {
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    color: '#9ca3af',
    fontSize: 15,
    marginTop: 12,
  },
  errorWrapper: {
    alignItems: 'center',
    paddingHorizontal: '10%',
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ef4444',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 13,
    color: '#9ca3af',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
  },
});
