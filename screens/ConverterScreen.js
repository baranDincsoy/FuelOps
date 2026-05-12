import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../styles/ConverterStyles';

export default function ConverterScreen() {
  const [activeTab, setActiveTab] = useState('volume');

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabRow}>
{[
  { key: 'volume', label: 'Volume' },
  { key: 'weight', label: 'Weight' },
  { key: 'temp', label: 'Temp' },
  { key: 'length', label: 'Length' },
  { key: 'quantity', label: 'Quantity' },
].map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'volume' && <VolumeConverter />}
        {activeTab === 'weight' && <WeightConverter />}
{activeTab === 'temp' && <TempConverter />}
{activeTab === 'length' && <LengthConverter />}
{activeTab === 'quantity' && <QuantityConverter />}
      </ScrollView>
    </View>
  );
}

// ─────────── VOLUME ───────────
function VolumeConverter() {
  const [values, setValues] = useState({ L: '', m3: '', usGal: '', bbl: '' });

  function update(field, value) {
    const num = parseFloat(value);
    if (isNaN(num)) {
      setValues({ L: '', m3: '', usGal: '', bbl: '' });
      return;
    }
    let litres;
    switch (field) {
      case 'L': litres = num; break;
      case 'm3': litres = num * 1000; break;
      case 'usGal': litres = num * 3.78541; break;
      case 'bbl': litres = num * 158.987; break;
    }
    setValues({
      L: litres.toFixed(2),
      m3: (litres / 1000).toFixed(4),
      usGal: (litres / 3.78541).toFixed(3),
      bbl: (litres / 158.987).toFixed(4),
    });
    setValues(prev => ({ ...prev, [field]: value }));
  }

  return (
    <View style={styles.card}>
      <Row label="Litres (L)" value={values.L} onChange={v => update('L', v)} />
      <Row label="Cubic Meters (m³)" value={values.m3} onChange={v => update('m3', v)} />
      <Row label="US Gallons" value={values.usGal} onChange={v => update('usGal', v)} />
      <Row label="Barrels (bbl)" value={values.bbl} onChange={v => update('bbl', v)} />
    </View>
  );
}
// ─────────── WEIGHT ───────────
function WeightConverter() {
  const [values, setValues] = useState({ kg: '', ton: '', lbs: '', lt: '' });

  function update(field, value) {
    const num = parseFloat(value);
    if (isNaN(num)) {
      setValues({ kg: '', ton: '', lbs: '', lt: '' });
      return;
    }
    let kg;
    switch (field) {
      case 'kg': kg = num; break;
      case 'ton': kg = num * 1000; break;
      case 'lbs': kg = num / 2.20462; break;
      case 'lt': kg = num * 1016.05; break;
    }
    setValues({
      kg: kg.toFixed(2),
      ton: (kg / 1000).toFixed(4),
      lbs: (kg * 2.20462).toFixed(2),
      lt: (kg / 1016.05).toFixed(4),
    });
    setValues(prev => ({ ...prev, [field]: value }));
  }

  return (
    <View style={styles.card}>
      <Row label="Kilograms (kg)" value={values.kg} onChange={v => update('kg', v)} />
      <Row label="Metric Tons" value={values.ton} onChange={v => update('ton', v)} />
      <Row label="Pounds (lbs)" value={values.lbs} onChange={v => update('lbs', v)} />
      <Row label="Long Tons" value={values.lt} onChange={v => update('lt', v)} />
    </View>
  );
}

// ─────────── TEMP ───────────
function TempConverter() {
  const [values, setValues] = useState({ c: '', f: '', k: '' });

  function update(field, value) {
    const num = parseFloat(value);
    if (isNaN(num)) {
      setValues({ c: '', f: '', k: '' });
      return;
    }
    let c;
    switch (field) {
      case 'c': c = num; break;
      case 'f': c = (num - 32) * 5 / 9; break;
      case 'k': c = num - 273.15; break;
    }
    setValues({
      c: c.toFixed(2),
      f: (c * 9 / 5 + 32).toFixed(2),
      k: (c + 273.15).toFixed(2),
    });
    setValues(prev => ({ ...prev, [field]: value }));
  }

  return (
    <View style={styles.card}>
      <Row label="Celsius (°C)" value={values.c} onChange={v => update('c', v)} />
      <Row label="Fahrenheit (°F)" value={values.f} onChange={v => update('f', v)} />
      <Row label="Kelvin (K)" value={values.k} onChange={v => update('k', v)} />
    </View>
  );
}

// ─────────── QUANTITY (Volume ↔ Weight via density) ───────────
function QuantityConverter() {
  const [density, setDensity] = useState('');
  const [litres, setLitres] = useState('');
  const [kg, setKg] = useState('');
  const [ton, setTon] = useState('');
  const [lbs, setLbs] = useState('');

  function updateFromLitres(L) {
    const d = parseFloat(density);
    const v = parseFloat(L);
    setLitres(L);
    if (!isNaN(d) && !isNaN(v)) {
      const k = v * (d / 1000);
      setKg(k.toFixed(2));
      setTon((k / 1000).toFixed(4));
      setLbs((k * 2.20462).toFixed(2));
    }
  }

  function updateFromKg(K) {
    const d = parseFloat(density);
    const k = parseFloat(K);
    setKg(K);
    if (!isNaN(d) && !isNaN(k)) {
      setLitres((k / (d / 1000)).toFixed(2));
      setTon((k / 1000).toFixed(4));
      setLbs((k * 2.20462).toFixed(2));
    }
  }

  function updateFromTon(T) {
    const d = parseFloat(density);
    const t = parseFloat(T);
    setTon(T);
    if (!isNaN(d) && !isNaN(t)) {
      const k = t * 1000;
      setKg(k.toFixed(2));
      setLitres((k / (d / 1000)).toFixed(2));
      setLbs((k * 2.20462).toFixed(2));
    }
  }

  function updateFromLbs(P) {
    const d = parseFloat(density);
    const p = parseFloat(P);
    setLbs(P);
    if (!isNaN(d) && !isNaN(p)) {
      const k = p / 2.20462;
      setKg(k.toFixed(2));
      setTon((k / 1000).toFixed(4));
      setLitres((k / (d / 1000)).toFixed(2));
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.helperText}>Enter density first, then any volume or weight to convert.</Text>
      <Row label="Density (kg/m³)" value={density} onChange={setDensity} />
      <View style={styles.divider} />
      <Row label="Litres (L)" value={litres} onChange={updateFromLitres} />
      <Row label="Kilograms (kg)" value={kg} onChange={updateFromKg} />
      <Row label="Tons" value={ton} onChange={updateFromTon} />
      <Row label="Pounds (lbs)" value={lbs} onChange={updateFromLbs} />
    </View>
  );
}
// ─────────── LENGTH ───────────
function LengthConverter() {
  const [values, setValues] = useState({ cm: '', inch: '', m: '', ft: '', mm: '' });

  function update(field, value) {
    const num = parseFloat(value);
    if (isNaN(num)) {
      setValues({ cm: '', inch: '', m: '', ft: '', mm: '' });
      return;
    }
    let cm;
    switch (field) {
      case 'cm': cm = num; break;
      case 'inch': cm = num * 2.54; break;
      case 'm': cm = num * 100; break;
      case 'ft': cm = num * 30.48; break;
      case 'mm': cm = num / 10; break;
    }
    setValues({
      cm: cm.toFixed(2),
      inch: (cm / 2.54).toFixed(3),
      m: (cm / 100).toFixed(4),
      ft: (cm / 30.48).toFixed(3),
      mm: (cm * 10).toFixed(1),
    });
    setValues(prev => ({ ...prev, [field]: value }));
  }

  return (
    <View style={styles.card}>
      <Row label="Centimeters (cm)" value={values.cm} onChange={v => update('cm', v)} />
      <Row label="Inches (in)" value={values.inch} onChange={v => update('inch', v)} />
      <Row label="Millimeters (mm)" value={values.mm} onChange={v => update('mm', v)} />
      <Row label="Meters (m)" value={values.m} onChange={v => update('m', v)} />
      <Row label="Feet (ft)" value={values.ft} onChange={v => update('ft', v)} />
    </View>
  );
}

// ─────────── Reusable Input Row ───────────
function Row({ label, value, onChange }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <TextInput
        style={styles.rowInput}
        keyboardType="numeric"
        value={value}
        onChangeText={onChange}
        placeholder="0"
      />
    </View>
  );
}