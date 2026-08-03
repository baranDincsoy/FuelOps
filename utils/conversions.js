// Pure conversion data and functions. No state, no UI.

export const VOLUME_UNITS = {
  L:     { label: 'Litres (L)',        toBase: 1 },
  m3:    { label: 'Cubic Meters (m³)', toBase: 1000 },
  usGal: { label: 'US Gallons',        toBase: 3.785411784 },
  bbl:   { label: 'Barrels (bbl)',     toBase: 158.987294928 },
};

export const WEIGHT_UNITS = {
  kg:  { label: 'Kilograms (kg)', toBase: 1 },
  ton: { label: 'Metric Tons',    toBase: 1000 },
  lbs: { label: 'Pounds (lbs)',   toBase: 0.45359237 },
  lt:  { label: 'Long Tons',      toBase: 1016.0469088 },
};

export const LENGTH_UNITS = {
  cm:   { label: 'Centimeters (cm)', toBase: 1 },
  inch: { label: 'Inches (in)',      toBase: 2.54 },
  mm:   { label: 'Millimeters (mm)', toBase: 0.1 },
  m:    { label: 'Meters (m)',       toBase: 100 },
  ft:   { label: 'Feet (ft)',        toBase: 30.48 },
};

/** Accepts Turkish/European comma decimals */
export function parseNumeric(raw) {
  return parseFloat(String(raw).replace(',', '.'));
}

/** Adaptive precision, trailing zeros stripped */
export function formatNumber(n) {
  if (!isFinite(n)) return '';
  const abs = Math.abs(n);
  let decimals;
  if (abs === 0) decimals = 0;
  else if (abs >= 1000) decimals = 2;
  else if (abs >= 1) decimals = 4;
  else decimals = 6;
  return parseFloat(n.toFixed(decimals)).toString();
}

/** Convert a base-unit amount into every unit in the table */
export function convertAll(units, baseValue) {
  const out = {};
  Object.keys(units).forEach(key => {
    out[key] = formatNumber(baseValue / units[key].toBase);
  });
  return out;
}

/** Temperature needs offsets, so it can't use the factor table */
export function convertTemperature(field, value) {
  let c;
  if (field === 'c') c = value;
  else if (field === 'f') c = (value - 32) * 5 / 9;
  else c = value - 273.15;

  return {
    c: formatNumber(c),
    f: formatNumber(c * 9 / 5 + 32),
    k: formatNumber(c + 273.15),
  };
}

/** Volume <-> mass, bridged by density in kg/m³ */
export function quantityFromMass(kg, densityKgM3) {
  return {
    litres: formatNumber(kg / (densityKgM3 / 1000)),
    kg:     formatNumber(kg),
    ton:    formatNumber(kg / 1000),
    lbs:    formatNumber(kg / 0.45359237),
  };
}

export function quantityFromVolume(litres, densityKgM3) {
  return quantityFromMass(litres * densityKgM3 / 1000, densityKgM3);
}