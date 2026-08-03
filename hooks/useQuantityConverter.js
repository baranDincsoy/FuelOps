import { useState } from 'react';
import { quantityFromMass, quantityFromVolume, parseNumeric } from '../utils/conversions';

const EMPTY = { litres: '', kg: '', ton: '', lbs: '' };

export function useQuantityConverter() {
  const [density, setDensity] = useState('');
  const [values, setValues] = useState(EMPTY);

  function update(field, raw) {
    const d = parseNumeric(density);

    if (String(raw).trim() === '') {
      setValues(EMPTY);
      return;
    }

    const n = parseNumeric(raw);
    if (isNaN(n) || isNaN(d) || d <= 0) {
      // no usable density yet — just echo the keystroke
      setValues(prev => ({ ...prev, [field]: raw }));
      return;
    }

    let next;
    switch (field) {
      case 'litres': next = quantityFromVolume(n, d); break;
      case 'kg':     next = quantityFromMass(n, d); break;
      case 'ton':    next = quantityFromMass(n * 1000, d); break;
      case 'lbs':    next = quantityFromMass(n * 0.45359237, d); break;
      default:       next = EMPTY;
    }
    next[field] = raw;
    setValues(next);
  }

  function clear() {
    setDensity('');
    setValues(EMPTY);
  }

  const densityReady = !isNaN(parseNumeric(density)) && parseNumeric(density) > 0;

  return { density, setDensity, densityReady, values, update, clear };
}