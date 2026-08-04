import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useHistory } from '../hooks/useHistory';
import styles from '../styles/HistoryStyles';

const TYPE_LABELS = {
  density:         { label: 'API Gravity',    color: '#1a3a5c' },
  meter:           { label: 'Meter Factor',   color: '#3B6D11' },
  compressibility: { label: 'Compressibility', color: '#854F0B' },
};

const FILTERS = [
  { key: 'all',             label: 'All' },
  { key: 'density',         label: 'API' },
  { key: 'meter',           label: 'Meter' },
  { key: 'compressibility', label: 'Compress' },
];

function formatDate(iso) {
  const d = new Date(iso);
  const pad = n => String(n).padStart(2, '0');
  return `${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function HistoryScreen() {
  const vm = useHistory();

  function confirmClear() {
    Alert.alert(
      'Clear all records?',
      'This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: vm.clearAll },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f.key}
            style={[styles.filterBtn, vm.filter === f.key && styles.filterBtnActive]}
            onPress={() => vm.setFilter(f.key)}
          >
            <Text style={[styles.filterText, vm.filter === f.key && styles.filterTextActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.list}>
        {vm.loading && <Text style={styles.emptyText}>Loading…</Text>}

        {!vm.loading && vm.records.length === 0 && (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>No saved records</Text>
            <Text style={styles.emptyText}>
              Calculate on any screen and tap Save to keep a record here.
            </Text>
          </View>
        )}

        {vm.records.map(rec => {
          const meta = TYPE_LABELS[rec.type] || { label: rec.type, color: '#666' };
          return (
            <View key={rec.id} style={styles.recordCard}>
              <View style={styles.recordHeader}>
                <View style={[styles.typeBadge, { backgroundColor: meta.color }]}>
                  <Text style={styles.typeBadgeText}>{meta.label}</Text>
                </View>
                <Text style={styles.recordDate}>{formatDate(rec.createdAt)}</Text>
                <TouchableOpacity onPress={() => vm.remove(rec.id)} hitSlop={{top:8,bottom:8,left:8,right:8}}>
                  <Text style={styles.deleteBtn}>✕</Text>
                </TouchableOpacity>
              </View>

              {rec.tank ? <Text style={styles.tankLabel}>Tank {rec.tank}</Text> : null}

              <View style={styles.valueRow}>
                {Object.entries(rec.outputs).map(([k, v]) => (
                  <View key={k} style={styles.valueItem}>
                    <Text style={styles.valueLabel}>{k}</Text>
                    <Text style={styles.valueNumber}>{v}</Text>
                  </View>
                ))}
              </View>

              <Text style={styles.inputSummary}>
                {Object.entries(rec.inputs).map(([k, v]) => `${k}: ${v}`).join('   ')}
              </Text>

              {rec.note ? <Text style={styles.noteLabel}>{rec.note}</Text> : null}
            </View>
          );
        })}

        {vm.total > 0 && (
          <TouchableOpacity style={styles.clearAllBtn} onPress={confirmClear}>
            <Text style={styles.clearAllText}>Clear all ({vm.total})</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}