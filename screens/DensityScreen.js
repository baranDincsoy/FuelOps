import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useDensityCalculator } from '../hooks/useDensityCalculator';
import { detectFuelType } from '../utils/densityCalc';
import styles from '../styles/DensityStyles';

export default function DensityScreen() {
  const vm = useDensityCalculator();
  const r = vm.result;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>API Gravity Calculator</Text>
        <Text style={styles.cardSubtitle}>Digital replacement for the Gammon GTP-3012-1A wheel</Text>

        <Text style={styles.label}>Standard</Text>
        <View style={styles.unitToggleRow}>
          <TouchableOpacity
            style={[styles.unitBtn, vm.useTable5B && styles.unitBtnActive]}
            onPress={() => vm.setUseTable5B(true)}
          >
            <Text style={[styles.unitBtnText, vm.useTable5B && styles.unitBtnTextActive]}>
              ASTM 5B (US)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.unitBtn, !vm.useTable5B && styles.unitBtnActive]}
            onPress={() => vm.setUseTable5B(false)}
          >
            <Text style={[styles.unitBtnText, !vm.useTable5B && styles.unitBtnTextActive]}>
              ASTM 54B (Metric)
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Observed API Gravity</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholderTextColor="#999"
          placeholder="e.g. 44.5"
          value={vm.observedApi}
          onChangeText={vm.setObservedApi}
        />

        <Text style={styles.label}>Fuel Temperature</Text>
        <View style={styles.unitToggleRow}>
          <TouchableOpacity
            style={[styles.unitBtn, !vm.useFahrenheit && styles.unitBtnActive]}
            onPress={() => vm.setUseFahrenheit(false)}
          >
            <Text style={[styles.unitBtnText, !vm.useFahrenheit && styles.unitBtnTextActive]}>°C</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.unitBtn, vm.useFahrenheit && styles.unitBtnActive]}
            onPress={() => vm.setUseFahrenheit(true)}
          >
            <Text style={[styles.unitBtnText, vm.useFahrenheit && styles.unitBtnTextActive]}>°F</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholderTextColor="#999"
          placeholder={vm.useFahrenheit ? 'e.g. 76' : 'e.g. 24'}
          value={vm.temperature}
          onChangeText={vm.setTemperature}
        />

        {vm.error && <Text style={styles.errorText}>{vm.error}</Text>}

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.btnCalc} onPress={vm.calculate}>
            <Text style={styles.btnText}>Calculate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnClear} onPress={vm.clear}>
            <Text style={styles.btnClearText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>

      {r && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Result</Text>

          <View style={styles.resultMain}>
            <Text style={styles.resultLabel}>
              Corrected API Gravity @ {vm.useTable5B ? '60°F' : '15°C'}
            </Text>
            <Text style={styles.resultValue}>{r.correctedApi}°</Text>
            <Text style={styles.detectedFuel}>
              Detected: {detectFuelType(r.correctedApi)}
            </Text>
            <Text style={styles.standardTag}>
              Standard: {vm.useTable5B ? 'ASTM 5B/6B (US)' : 'ASTM 54B (Metric)'}
            </Text>
          </View>

          <View style={styles.resultGrid}>
            <View style={styles.resultItem}>
              <Text style={styles.itemLabel}>
                Density @ {vm.useTable5B ? '60°F' : '15°C'}
              </Text>
              <Text style={styles.itemValue}>
                {vm.useTable5B ? `${r.densityLbFt3} lb/ft3` : `${r.density15} kg/m3`}
              </Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.itemLabel}>Specific Gravity</Text>
              <Text style={styles.itemValue}>{r.sg}</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.itemLabel}>VCF</Text>
              <Text style={styles.itemValue}>{r.vcf}</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.itemLabel}>
                {vm.useTable5B ? 'Lbs/Gallon' : 'kg/L'}
              </Text>
              <Text style={styles.itemValue}>
                {vm.useTable5B ? r.lbsPerGal : (r.density15 / 1000).toFixed(4)}
              </Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}