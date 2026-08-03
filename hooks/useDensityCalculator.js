import { useState } from 'react';
import { correctApiGravity, correctApiGravity5B } from '../utils/densityCalc';
import { parseNumeric } from '../utils/conversions';

export function useDensityCalculator() {
  const [observedApi, setObservedApi] = useState('');
  const [temperature, setTemperature] = useState('');
  const [useFahrenheit, setUseFahrenheit] = useState(true);
  const [useTable5B, setUseTable5B] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  function calculate() {
    const api = parseNumeric(observedApi);
    const temp = parseNumeric(temperature);

    if (isNaN(api) || isNaN(temp)) {
      setError('Enter observed API gravity and temperature.');
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
    setResult(useTable5B
      ? correctApiGravity5B(api, tempF)
      : correctApiGravity(api, tempF));
  }

  function clear() {
    setObservedApi('');
    setTemperature('');
    setResult(null);
    setError(null);
  }

  return {
    observedApi, setObservedApi,
    temperature, setTemperature,
    useFahrenheit, setUseFahrenheit,
    useTable5B, setUseTable5B,
    result, error,
    calculate, clear,
  };
}