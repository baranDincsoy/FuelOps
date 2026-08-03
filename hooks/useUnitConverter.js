import { useState } from 'react';
import { convertAll, parseNumeric } from '../utils/conversions';

/**
 * Generic converter ViewModel.
 * Works for any unit table that converts linearly through a base unit.
 */
export function useUnitConverter(units) {
  const emptyState = Object.keys(units).reduce((acc, k) => ({ ...acc, [k]: '' }), {});
  const [values, setValues] = useState(emptyState);

  function update(field, raw) {
    if (String(raw).trim() === '') {
      setValues(emptyState);
      return;
    }

    const n = parseNumeric(raw);
    if (isNaN(n)) {
      // keep the keystroke visible (e.g. a lone "-" or ".") but don't convert
      setValues(prev => ({ ...prev, [field]: raw }));
      return;
    }

    const base = n * units[field].toBase;
    const next = convertAll(units, base);
    next[field] = raw;          // preserve exactly what the user typed
    setValues(next);
  }

  function clear() {
    setValues(emptyState);
  }

  return { values, update, clear, units };
}