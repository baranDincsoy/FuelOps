import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useMeterCalibration } from '../hooks/useMeterCalibration';
import styles from '../styles/MeterStyles';
import { useSaveRecord } from '../hooks/useSaveRecord';



export default function MeterCalibrationScreen() {
  const vm = useMeterCalibration();
  const [unit, setUnit] = React.useState('');
  const saver = useSaveRecord();

  function handleSave() {
    saver.save({
      type: 'meter',
      tank: unit.trim(),
      inputs: {
        'Corrected API': vm.correctedApi,
        'Temp': `${vm.productTemp}${vm.useFahrenheit ? '°F' : '°C'}`,
      },
      outputs: {
        'VCF': vm.result.vcf,
        'Lbs/Gal': vm.result.lbsPerGalAtTemp,
        'API @ temp': `${vm.result.apiAtTemp}°`,
      },
    });
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Meter Calibration Factor</Text>
        <Text style={styles.cardSubtitle}>
          Corrected API + product temperature → correction factor
        </Text>

        <Text style={styles.label}>Corrected API Gravity @ 60°F</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholderTextColor="#999"
          placeholder="e.g. 43.1"
          value={vm.correctedApi}
          onChangeText={vm.setCorrectedApi}
        />

        <Text style={styles.label}>Product Temperature</Text>
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
          placeholder={vm.useFahrenheit ? 'e.g. 83' : 'e.g. 28'}
          value={vm.productTemp}
          onChangeText={vm.setProductTemp}
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
            <Text style={styles.factorLabel}>Correction Factor (VCF)</Text>
            <Text style={styles.factorValue}>{vm.result.vcf}</Text>
            <Text style={styles.factorSub}>
              ΔT = {vm.result.deltaT > 0 ? '+' : ''}{vm.result.deltaT}°F from 60°F
            </Text>
          </View>

          <Text style={styles.sectionLabel}>At product temperature</Text>
          <View style={styles.resultGrid}>
            <View style={styles.resultItem}>
              <Text style={styles.itemLabel}>Lbs/Gallon</Text>
              <Text style={styles.itemValueBig}>{vm.result.lbsPerGalAtTemp}</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.itemLabel}>API @ temp</Text>
              <Text style={styles.itemValue}>{vm.result.apiAtTemp}°</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.itemLabel}>Density</Text>
              <Text style={styles.itemValue}>{vm.result.densityLbFt3AtTemp} lb/ft3</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.itemLabel}>Specific Gravity</Text>
              <Text style={styles.itemValue}>{vm.result.sgAtTemp}</Text>
            </View>
          </View>

          <Text style={styles.sectionLabel}>At 60°F reference</Text>
          <View style={styles.resultGrid}>
            <View style={styles.resultItem}>
              <Text style={styles.itemLabel}>Lbs/Gallon</Text>
              <Text style={styles.itemValue}>{vm.result.lbsPerGal60}</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.itemLabel}>Density</Text>
              <Text style={styles.itemValue}>{vm.result.density60} kg/m3</Text>
            </View>
          </View>
          <View style={styles.saveRow}>
            <TextInput
              style={styles.tankInput}
              placeholderTextColor="#999"
              placeholder="Cart / meter no. (optional)"
              value={unit}
              onChangeText={setUnit}
            />
            <TouchableOpacity
              style={[styles.btnSave, saver.saved && styles.btnSaved]}
              onPress={handleSave}
              disabled={saver.saving}
            >
              <Text style={styles.btnSaveText}>{saver.saved ? '✓ Saved' : 'Save'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}