import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { calculateVCF, fahrenheitToCelsius, lbFt3ToKgm3 } from '../utils/densityCalc';
import styles from '../styles/HomeStyles';

export default function HomeScreen() {
  const [temperature, setTemperature] = useState('');
  const [density, setDensity] = useState('');
  const [useFahrenheit, setUseFahrenheit] = useState(false);
  const [densityUnit, setDensityUnit] = useState('kgm3');
  const [vcf, setVcf] = useState(null);

  function handleCalculate() {
    let temp = parseFloat(temperature);
    let dens = parseFloat(density);

    if (isNaN(temp) || isNaN(dens)) {
      alert('Please enter valid values.');
      return;
    }

    if (useFahrenheit) {
      temp = fahrenheitToCelsius(temp);
    }

    if (densityUnit === 'lbft3') {
      dens = lbFt3ToKgm3(dens);
    }

    const result = calculateVCF(dens, temp);
    setVcf(Math.round(result * 10000) / 10000);
  }

  function handleClear() {
    setTemperature('');
    setDensity('');
    setVcf(null);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>VCF Calculator</Text>
        <Text style={styles.cardSubtitle}>ASTM Table 54B — Volume Correction Factor</Text>

        {/* Temperature */}
        <Text style={styles.label}>Temperature</Text>
        <View style={styles.unitToggleRow}>
          <TouchableOpacity
            style={[styles.unitBtn, !useFahrenheit && styles.unitBtnActive]}
            onPress={() => setUseFahrenheit(false)}
          >
            <Text style={[styles.unitBtnText, !useFahrenheit && styles.unitBtnTextActive]}>°C</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.unitBtn, useFahrenheit && styles.unitBtnActive]}
            onPress={() => setUseFahrenheit(true)}
          >
            <Text style={[styles.unitBtnText, useFahrenheit && styles.unitBtnTextActive]}>°F</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder={useFahrenheit ? 'e.g. 93.2' : 'e.g. 34'}
          value={temperature}
          onChangeText={setTemperature}
        />

        {/* Density */}
        <Text style={styles.label}>Observed Density</Text>
        <View style={styles.unitToggleRow}>
          <TouchableOpacity
            style={[styles.unitBtn, densityUnit === 'kgm3' && styles.unitBtnActive]}
            onPress={() => setDensityUnit('kgm3')}
          >
            <Text style={[styles.unitBtnText, densityUnit === 'kgm3' && styles.unitBtnTextActive]}>kg/m3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.unitBtn, densityUnit === 'lbft3' && styles.unitBtnActive]}
            onPress={() => setDensityUnit('lbft3')}
          >
            <Text style={[styles.unitBtnText, densityUnit === 'lbft3' && styles.unitBtnTextActive]}>lb/ft3</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder={densityUnit === 'kgm3' ? 'e.g. 816' : 'e.g. 50.9'}
          value={density}
          onChangeText={setDensity}
        />

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.btnCalc} onPress={handleCalculate}>
            <Text style={styles.btnText}>Get VCF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnClear} onPress={handleClear}>
            <Text style={styles.btnClearText}>Clear</Text>
          </TouchableOpacity>
        </View>

        {/* Result */}
        {vcf !== null && (
          <View style={styles.resultBox}>
            <Text style={styles.resultLabel}>Volume Correction Factor</Text>
            <Text style={styles.resultValue}>{vcf}</Text>
            <Text style={styles.resultSub}>ASTM 54B @ {useFahrenheit ? '59°F' : '15°C'}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}