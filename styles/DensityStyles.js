import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8', padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1a3a5c', marginBottom: 2 },
  cardSubtitle: { fontSize: 12, color: '#888', marginBottom: 12 },
  label: { fontSize: 13, color: '#555', marginBottom: 6, marginTop: 12 },
  
  // Fuel type buttons
  fuelRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 4,
  },
  fuelBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#1a3a5c',
    backgroundColor: '#fff',
  },
  fuelBtnActive: {
    backgroundColor: '#1a3a5c',
  },
  fuelBtnText: {
    fontSize: 12,
    color: '#1a3a5c',
    fontWeight: '600',
  },
  fuelBtnTextActive: {
    color: '#fff',
  },
  errorText: { color: '#c62828', fontSize: 12, marginTop: 10 },
  // Unit toggle
  unitToggleRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  unitBtn: {
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1a3a5c',
    backgroundColor: '#fff',
  },
  unitBtnActive: { backgroundColor: '#1a3a5c' },
  unitBtnText: { fontSize: 14, color: '#1a3a5c', fontWeight: '600' },
  unitBtnTextActive: { color: '#fff' },

  // Input
input: {
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
  padding: 10,
  fontSize: 16,
  color: '#1a3a5c',
  backgroundColor: '#fafafa',
},

  // Buttons
  buttonRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  btnCalc: {
    flex: 1,
    backgroundColor: '#1a3a5c',
    padding: 13,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  btnClear: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 13,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1a3a5c',
  },
  standardTag: {
  fontSize: 11,
  color: '#888',
  marginTop: 6,
  fontStyle: 'italic',
},
  btnClearText: { color: '#1a3a5c', fontSize: 15, fontWeight: 'bold' },

  // Result
  resultMain: {
    backgroundColor: '#e8f0fb',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
  },
  resultLabel: { fontSize: 13, color: '#555', marginBottom: 4 },
  resultValue: { fontSize: 42, fontWeight: 'bold', color: '#1a3a5c' },

  resultGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  input: {
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
  padding: 10,
  fontSize: 16,
  color: '#1a3a5c',      // ← input text rengi
  backgroundColor: '#fafafa',
},
  resultItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  detectedFuel: {
  fontSize: 13,
  color: '#555',
  marginTop: 8,
  fontStyle: 'italic',
},
  itemLabel: { fontSize: 12, color: '#888', marginBottom: 4 },
  itemValue: { fontSize: 16, fontWeight: 'bold', color: '#1a3a5c' },
  saveRow: { flexDirection: 'row', gap: 8, marginTop: 14, alignItems: 'center' },
  tankInput: {
    flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 9, fontSize: 14,
    color: '#1a3a5c', backgroundColor: '#fafafa',
  },
  btnSave: {
    backgroundColor: '#1a3a5c', paddingVertical: 11,
    paddingHorizontal: 22, borderRadius: 8,
  },
  btnSaved: { backgroundColor: '#3B6D11' },
  btnSaveText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
});