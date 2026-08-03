import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useCompressibility } from '../hooks/useCompressibility';
import styles from '../styles/CompressibilityStyles';

export default function CompressibilityScreen() {
  const vm = useCompressibility();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Compressibility Factor</Text>
        <Text style={styles.cardSubtitle}>
          API MPMS 11.2.1 — cart & meter calibration
        </Text>

        <Text style={styles.label}>Corrected API Gravity @ 60°F</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholderTextColor="#999"
          placeholder="e.g. 43.5"
          value={vm.api}
          onChangeText={vm.setApi}
        />

        <Text style={styles.label}>Product Temperature (°F)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholderTextColor="#999"
          placeholder="e.g. 87"
          value={vm.temperature}
          onChangeText={vm.setTemperature}
        />

        <Text style={styles.label}>Pressure (psi) — optional</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholderTextColor="#999"
          placeholder="leave blank for factor only"
          value={vm.pressure}
          onChangeText={vm.setPressure}
        />

        {vm.error && <Text style={styles.errorText}>{vm.error}</Text>}

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.btnCalc} onPress={vm.calculate}>
            <Text style={styles.btnText}>Get Factor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnClear} onPress={vm.clear}>
            <Text style={styles.btnClearText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>

      {vm.result && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Result</Text>

          <View style={styles.factorBox}>
            <Text style={styles.factorLabel}>Compressibility Factor</Text>
            <Text style={styles.factorValue}>{vm.result.tableValue.toFixed(3)}</Text>
            <Text style={styles.factorSub}>per psi, ×100000 (as printed in tables)</Text>
          </View>

          {vm.result.cpl !== null && (
            <View style={styles.cplBox}>
              <Text style={styles.cplLabel}>CPL — Pressure Correction</Text>
              <Text style={styles.cplValue}>{vm.result.cpl.toFixed(5)}</Text>
            </View>
          )}

          <Text style={styles.sectionLabel}>Reference values @ 60°F</Text>
          <View style={styles.resultGrid}>
            <View style={styles.resultItem}>
              <Text style={styles.itemLabel}>Lbs/Gallon</Text>
              <Text style={styles.itemValue}>{vm.result.lbsPerGal60}</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.itemLabel}>Specific Gravity</Text>
              <Text style={styles.itemValue}>{vm.result.sg60}</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.itemLabel}>Density</Text>
              <Text style={styles.itemValue}>{vm.result.density60} kg/m3</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.itemLabel}>Table cell</Text>
              <Text style={styles.itemValue}>
                {vm.result.roundedApi} / {vm.result.roundedTemp}°F
              </Text>
            </View>
          </View>

          <Text style={styles.noteText}>
            Printed tables step in 0.5 increments — this result is calculated at
            your exact input, so no rounding is needed.
          </Text>
                    <Text style={styles.noteText}>
            Calculated per API MPMS 11.2.1. Valid for 0-90° API and 0-200°F —
            covers jet fuel, diesel, gasoline and AVGAS. Printed tables typically
            only cover a narrow API band and step in 0.5 increments; this result
            is computed at your exact input.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}