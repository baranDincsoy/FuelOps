import { useState } from 'react';
import { calculateMeterFactor } from '../utils/densityCalc';

export function useMeterCalibration() {
  const [correctedApi, setCorrectedApi] = useState('');
  const [productTemp, setProductTemp] = useState('');
  const [useFahrenheit, setUseFahrenheit] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  function parseInput(value) {
    return parseFloat(String(value).replace(',', '.'));
  }

  function calculate() {
    const api = parseInput(correctedApi);
    const temp = parseInput(productTemp);

    if (isNaN(api) || isNaN(temp)) {
      setError('Enter valid API gravity and temperature.');
      setResult(null);
      return;
    }
    if (api < 0 || api > 100) {
      setError('API gravity out of range (0-100).');
      setResult(null);
      return;
    }

    const tempF = useFahrenheit ? temp : (temp * 9 / 5) + 32;
    setError(null);
    setResult(calculateMeterFactor(api, tempF));
  }

  function clear() {
    setCorrectedApi('');
    setProductTemp('');
    setResult(null);
    setError(null);
  }

  return {
    correctedApi, setCorrectedApi,
    productTemp, setProductTemp,
    useFahrenheit, setUseFahrenheit,
    result, error,
    calculate, clear,
  };
}