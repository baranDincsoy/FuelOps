import { useState } from 'react';
import { calculateCompressibility } from '../utils/densityCalc';

export function useCompressibility() {
  const [api, setApi] = useState('');
  const [temperature, setTemperature] = useState('');
  const [pressure, setPressure] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const num = v => parseFloat(String(v).replace(',', '.'));

  function calculate() {
    const a = num(api);
    const t = num(temperature);
    const p = pressure.trim() === '' ? null : num(pressure);

    if (isNaN(a) || isNaN(t)) {
      setError('Enter corrected API gravity and temperature.');
      setResult(null);
      return;
    }
    if (a < 0 || a > 100) {
      setError('API gravity out of range (0-100).');
      setResult(null);
      return;
    }
    if (p !== null && (isNaN(p) || p < 0)) {
      setError('Pressure must be a positive number.');
      setResult(null);
      return;
    }

    setError(null);
    setResult(calculateCompressibility(a, t, p));
  }

  function clear() {
    setApi('');
    setTemperature('');
    setPressure('');
    setResult(null);
    setError(null);
  }

  return {
    api, setApi,
    temperature, setTemperature,
    pressure, setPressure,
    result, error,
    calculate, clear,
  };
}