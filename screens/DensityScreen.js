import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView
} from 'react-native';
import { correctApiGravity, fahrenheitToCelsius, detectFuelType } from '../utils/densityCalc';
import styles from '../styles/DensityStyles';

export default function DensityScreen() {
  const [observedApi, setObservedApi] = useState('');
  const [temperature, setTemperature] = useState('');
  const [useFahrenheit, setUseFahrenheit] = useState(true);
  const [result, setResult] = useState(null);


  function handleCalculate() {
    const api = parseFloat(observedApi);
    let temp = parseFloat(temperature);

    if (isNaN(api) || isNaN(temp)) {
      alert('Please enter valid values.');
      return;
    }

    // Convert C to F if needed (function expects F)
    let tempF = useFahrenheit ? temp : (temp * 9 / 5) + 32;

    const res = correctApiGravity(api, tempF);
    setResult(res);
  }

  function handleClear() {
    setObservedApi('');
    setTemperature('');
    setResult(null);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>API Gravity Calculator</Text>
        <Text style={styles.cardSubtitle}>Digital replacement for Gammon GTP-3012-1A wheel</Text>

        {/* Observed API */}
        <Text style={styles.label}>Observed API Gravity</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 42.0"
          value={observedApi}
          onChangeText={setObservedApi}
        />

        {/* Temperature */}
        <Text style={styles.label}>Fuel Temperature</Text>
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
          placeholder={useFahrenheit ? 'e.g. 78' : 'e.g. 26'}
          value={temperature}
          onChangeText={setTemperature}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.btnCalc} onPress={handleCalculate}>
            <Text style={styles.btnText}>Calculate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnClear} onPress={handleClear}>
            <Text style={styles.btnClearText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>

{result && (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>Result</Text>

<View style={styles.resultMain}>
  <Text style={styles.resultLabel}>
    Corrected API Gravity @ {useFahrenheit ? '60°F' : '15°C'}
  </Text>
  <Text style={styles.resultValue}>{result.correctedApi}°</Text>
  <Text style={styles.detectedFuel}>
    Detected: {detectFuelType(result.correctedApi)}
  </Text>
</View>

    <View style={styles.resultGrid}>
      <View style={styles.resultItem}>
        <Text style={styles.itemLabel}>
          {useFahrenheit ? 'Density @ 60°F' : 'Density @ 15°C'}
        </Text>
        <Text style={styles.itemValue}>
          {useFahrenheit
            ? `${(result.density15 * 0.062428).toFixed(3)} lb/ft3`
            : `${result.density15} kg/m3`}
        </Text>
      </View>
      <View style={styles.resultItem}>
        <Text style={styles.itemLabel}>Specific Gravity</Text>
        <Text style={styles.itemValue}>{result.sg}</Text>
      </View>
      <View style={styles.resultItem}>
        <Text style={styles.itemLabel}>VCF</Text>
        <Text style={styles.itemValue}>{result.vcf}</Text>
      </View>
      <View style={styles.resultItem}>
        <Text style={styles.itemLabel}>
          {useFahrenheit ? 'Lbs/Gallon' : 'kg/L'}
        </Text>
        <Text style={styles.itemValue}>
          {useFahrenheit
            ? (result.density15 * 0.008345).toFixed(3)
            : (result.density15 / 1000).toFixed(4)}
        </Text>
      </View>
    </View>
  </View>
)}
    </ScrollView>
  );
}