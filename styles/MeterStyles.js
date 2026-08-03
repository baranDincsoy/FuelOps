import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8', padding: 16 },
  card: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16,
    marginBottom: 16, elevation: 2,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, shadowRadius: 4,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1a3a5c', marginBottom: 2 },
  cardSubtitle: { fontSize: 12, color: '#888', marginBottom: 12 },
  label: { fontSize: 13, color: '#555', marginBottom: 6, marginTop: 12 },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
    padding: 10, fontSize: 16, color: '#1a3a5c', backgroundColor: '#fafafa',
  },
  unitToggleRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  unitBtn: {
    paddingVertical: 7, paddingHorizontal: 20, borderRadius: 8,
    borderWidth: 1, borderColor: '#1a3a5c', backgroundColor: '#fff',
  },
  unitBtnActive: { backgroundColor: '#1a3a5c' },
  unitBtnText: { fontSize: 14, color: '#1a3a5c', fontWeight: '600' },
  unitBtnTextActive: { color: '#fff' },
  errorText: { color: '#c62828', fontSize: 12, marginTop: 10 },
  buttonRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  btnCalc: {
    flex: 1, backgroundColor: '#1a3a5c', padding: 13,
    borderRadius: 8, alignItems: 'center',
  },
  btnText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  btnClear: {
    flex: 1, backgroundColor: '#fff', padding: 13, borderRadius: 8,
    alignItems: 'center', borderWidth: 1, borderColor: '#1a3a5c',
  },
  btnClearText: { color: '#1a3a5c', fontSize: 15, fontWeight: 'bold' },

  factorBox: {
    backgroundColor: '#e8f0fb', borderRadius: 10,
    padding: 20, alignItems: 'center', marginBottom: 16,
  },
  factorLabel: { fontSize: 13, color: '#555' },
  factorValue: { fontSize: 44, fontWeight: 'bold', color: '#1a3a5c', marginVertical: 4 },
  factorSub: { fontSize: 12, color: '#888' },

  sectionLabel: {
    fontSize: 12, color: '#888', fontWeight: '600',
    textTransform: 'uppercase', letterSpacing: 0.5,
    marginBottom: 8, marginTop: 4,
  },
  resultGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  resultItem: {
    flex: 1, minWidth: '45%', backgroundColor: '#f8f9fa',
    borderRadius: 8, padding: 12, alignItems: 'center',
  },
  itemLabel: { fontSize: 12, color: '#888', marginBottom: 4 },
  itemValue: { fontSize: 16, fontWeight: 'bold', color: '#1a3a5c' },
  itemValueBig: { fontSize: 20, fontWeight: 'bold', color: '#1a3a5c' },
});