import { useState } from 'react';
import { convertTemperature, parseNumeric } from '../utils/conversions';

const EMPTY = { c: '', f: '', k: '' };

export function useTemperatureConverter() {
  const [values, setValues] = useState(EMPTY);

  function update(field, raw) {
    if (String(raw).trim() === '') {
      setValues(EMPTY);
      return;
    }

    const n = parseNumeric(raw);
    if (isNaN(n)) {
      setValues(prev => ({ ...prev, [field]: raw }));
      return;
    }

    const next = convertTemperature(field, n);
    next[field] = raw;
    setValues(next);
  }

  function clear() {
    setValues(EMPTY);
  }

  return { values, update, clear };
}