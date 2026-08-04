import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },

  filterRow: {
    flexDirection: 'row', gap: 8,
    paddingHorizontal: 16, paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1, borderBottomColor: '#e6e6e6',
  },
  filterBtn: {
    paddingVertical: 6, paddingHorizontal: 14,
    borderRadius: 20, borderWidth: 1, borderColor: '#1a3a5c',
  },
  filterBtnActive: { backgroundColor: '#1a3a5c' },
  filterText: { fontSize: 12, color: '#1a3a5c', fontWeight: '600' },
  filterTextActive: { color: '#fff' },

  list: { flex: 1, padding: 16 },

  emptyBox: { alignItems: 'center', paddingVertical: 60, paddingHorizontal: 30 },
  emptyTitle: { fontSize: 16, color: '#666', fontWeight: '600', marginBottom: 6 },
  emptyText: { fontSize: 13, color: '#999', textAlign: 'center', lineHeight: 19 },

  recordCard: {
    backgroundColor: '#fff', borderRadius: 10,
    padding: 14, marginBottom: 10, elevation: 1,
  },
  recordHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  typeBadge: { paddingVertical: 3, paddingHorizontal: 9, borderRadius: 5 },
  typeBadgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  recordDate: { flex: 1, fontSize: 12, color: '#999', marginLeft: 10 },
  deleteBtn: { fontSize: 16, color: '#ccc', paddingHorizontal: 4 },

  tankLabel: { fontSize: 13, color: '#1a3a5c', fontWeight: '600', marginBottom: 8 },

  valueRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  valueItem: {
    flex: 1, minWidth: '30%', backgroundColor: '#f8f9fa',
    borderRadius: 6, padding: 8, alignItems: 'center',
  },
  valueLabel: { fontSize: 10, color: '#999', marginBottom: 2 },
  valueNumber: { fontSize: 14, fontWeight: 'bold', color: '#1a3a5c' },

  inputSummary: { fontSize: 11, color: '#888' },
  noteLabel: { fontSize: 12, color: '#666', fontStyle: 'italic', marginTop: 6 },

  clearAllBtn: {
    marginTop: 8, marginBottom: 30, paddingVertical: 11,
    borderRadius: 8, borderWidth: 1, borderColor: '#c62828', alignItems: 'center',
  },
  clearAllText: { color: '#c62828', fontSize: 14, fontWeight: '600' },
});