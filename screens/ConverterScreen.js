import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useUnitConverter } from '../hooks/useUnitConverter';
import { useTemperatureConverter } from '../hooks/useTemperatureConverter';
import { useQuantityConverter } from '../hooks/useQuantityConverter';
import { VOLUME_UNITS, WEIGHT_UNITS, LENGTH_UNITS } from '../utils/conversions';
import styles from '../styles/ConverterStyles';

const TABS = [
  { key: 'volume',   label: 'Volume' },
  { key: 'weight',   label: 'Weight' },
  { key: 'temp',     label: 'Temp' },
  { key: 'length',   label: 'Length' },
  { key: 'quantity', label: 'Quantity' },
];

export default function ConverterScreen() {
  const [activeTab, setActiveTab] = useState('volume');

  return (
    <View style={styles.container}>
      <View style={styles.tabRow}>
        {TABS.map(tab => (
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
        {activeTab === 'volume'   && <TableConverter units={VOLUME_UNITS} />}
        {activeTab === 'weight'   && <TableConverter units={WEIGHT_UNITS} />}
        {activeTab === 'length'   && <TableConverter units={LENGTH_UNITS} />}
        {activeTab === 'temp'     && <TemperatureConverter />}
        {activeTab === 'quantity' && <QuantityConverter />}
      </ScrollView>
    </View>
  );
}

/** One component drives Volume, Weight and Length — only the unit table differs */
function TableConverter({ units }) {
  const vm = useUnitConverter(units);

  return (
    <View style={styles.card}>
      {Object.keys(units).map(key => (
        <Row
          key={key}
          label={units[key].label}
          value={vm.values[key]}
          onChange={v => vm.update(key, v)}
        />
      ))}
      <ClearButton onPress={vm.clear} />
    </View>
  );
}

function TemperatureConverter() {
  const vm = useTemperatureConverter();

  return (
    <View style={styles.card}>
      <Row label="Celsius (°C)"    value={vm.values.c} onChange={v => vm.update('c', v)} />
      <Row label="Fahrenheit (°F)" value={vm.values.f} onChange={v => vm.update('f', v)} />
      <Row label="Kelvin (K)"      value={vm.values.k} onChange={v => vm.update('k', v)} />
      <ClearButton onPress={vm.clear} />
    </View>
  );
}

function QuantityConverter() {
  const vm = useQuantityConverter();

  return (
    <View style={styles.card}>
      <Text style={styles.helperText}>
        Enter density first, then any volume or weight to convert.
      </Text>

      <Row label="Density (kg/m³)" value={vm.density} onChange={vm.setDensity} />
      <View style={styles.divider} />

      <Row label="Litres (L)"      value={vm.values.litres} onChange={v => vm.update('litres', v)} />
      <Row label="Kilograms (kg)"  value={vm.values.kg}     onChange={v => vm.update('kg', v)} />
      <Row label="Metric Tons"     value={vm.values.ton}    onChange={v => vm.update('ton', v)} />
      <Row label="Pounds (lbs)"    value={vm.values.lbs}    onChange={v => vm.update('lbs', v)} />

      {!vm.densityReady && (
        <Text style={styles.warnText}>Density required before converting.</Text>
      )}

      <ClearButton onPress={vm.clear} />
    </View>
  );
}

function Row({ label, value, onChange }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <TextInput
        style={styles.rowInput}
        keyboardType="numeric"
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChange}
        placeholder="0"
      />
    </View>
  );
}

function ClearButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.clearBtn} onPress={onPress}>
      <Text style={styles.clearBtnText}>Clear</Text>
    </TouchableOpacity>
  );
}