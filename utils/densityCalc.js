// ASTM D1250 / Table 54B - Generalized Products (Refined)
const TOLERANCE = 0.00001;
const MAX_ITERATIONS = 20;

// Table 54B K constants by density range
function getKConstants(density) {
  if (density < 770) {
    return { k0: 346.4228, k1: 0.4388 };       // Gasolines
  } else if (density < 778) {
    return { k0: 2680.3206, k1: -0.00336312 }; // Transition
  } else if (density < 839) {
    return { k0: 594.5418, k1: 0 };            // Jet fuels / Kerosene
  } else {
    return { k0: 186.9696, k1: 0.4862 };       // Diesel / Fuel oils
  }
}

/**
 * Calculate density at 15°C from observed density at observed temperature
 * Using iterative ASTM D1250 Table 54B method
 */
export function calculateDensity15(observedDensity, tempC) {
  const dT = tempC - 15;

  let density15 = observedDensity;
  let lastDensity = 0;
  let iterations = 0;

  while (Math.abs(density15 - lastDensity) > TOLERANCE && iterations < MAX_ITERATIONS) {
    lastDensity = density15;

    const { k0, k1 } = getKConstants(density15);
    const alpha15 = (k0 + k1 * density15) / (density15 * density15);
    const vcf = Math.exp(-alpha15 * dT * (1 + 0.8 * alpha15 * dT));

    // VCF = Observed Density / Standard Density
    // Therefore: Standard Density = Observed Density / VCF
    density15 = observedDensity / vcf;

    iterations++;
  }

  // Final calculations
  const { k0, k1 } = getKConstants(density15);
  const alpha15 = (k0 + k1 * density15) / (density15 * density15);
  const vcf = Math.exp(-alpha15 * dT * (1 + 0.8 * alpha15 * dT));
  const sg = density15 / 999.016;
  const apiGravity = (141.5 / sg) - 131.5;

  return {
    density15: Math.round(density15 * 10) / 10,
    vcf: Math.round(vcf * 10000) / 10000,
    sg: Math.round(sg * 10000) / 10000,
    apiGravity: Math.round(apiGravity * 10) / 10,
    alpha15: alpha15,
    iterations: iterations,
    isValid: density15 >= 775 && density15 <= 840,
  };
}

/**
 * Just calculate VCF for Home screen
 */
export function calculateVCF(observedDensity, tempC) {
  const result = calculateDensity15(observedDensity, tempC);
  return result.vcf;
}

/**
 * API Gravity correction - converts observed API at temp°F to corrected API at 60°F
 */
export function correctApiGravity(observedApi, tempF) {
  // Step 1: Observed API -> Observed Density at observed temp
  const sgObs = 141.5 / (observedApi + 131.5);
  const densityObs = sgObs * 999.016;

  // Step 2: Convert °F to °C for calculation
  const tempC = (tempF - 32) * 5 / 9;

  // Step 3: Iteratively find density at 15°C
  const result = calculateDensity15(densityObs, tempC);

  // Step 4: Convert density at 15°C back to API gravity
  const sgCorrected = result.density15 / 999.016;
  const correctedApi = (141.5 / sgCorrected) - 131.5;

  return {
    correctedApi: Math.round(correctedApi * 10) / 10,
    densityAt60F: result.density15,
    density15: result.density15,
    sg: result.sg,
    vcf: result.vcf,
    iterations: result.iterations,
  };
}

// Unit conversions
export function fahrenheitToCelsius(f) {
  return (f - 32) * 5 / 9;
}

export function celsiusToFahrenheit(c) {
  return (c * 9 / 5) + 32;
}

export function kgm3ToLbFt3(kgm3) {
  return Math.round(kgm3 * 0.062428 * 1000) / 1000;
}

export function kgm3ToKgL(kgm3) {
  return Math.round(kgm3 / 1000 * 10000) / 10000;
}

export function lbFt3ToKgm3(lbft3) {
  return Math.round(lbft3 / 0.062428 * 10) / 10;
}

export function detectFuelType(api) {
  if (api >= 65 && api <= 75) return 'AVGAS';
  if (api >= 55 && api < 65) return 'MOGAS';
  if (api >= 37 && api < 55) return 'JET A / JET A-1';
  if (api >= 30 && api < 37) return 'Marine Diesel';
  if (api >= 20 && api < 30) return 'Gas Oil';
  if (api < 20) return 'Heavy Fuel Oil';
  return 'Unknown';
}

/**
 * ASTM D1250 Table 6B / 5B — US customary (60°F reference)
 * Works in kg/m³ with ΔT in °F.
 * K constants are the Table 54B values scaled by 5/9 (since 1°F = 5/9 °C).
 */
function getKConstants6B(density60) {
  // density60 in kg/m³ at 60°F
  if (density60 < 770) {
    return { k0: 346.4228 * 5 / 9, k1: 0.4388 * 5 / 9 };      // Gasolines
  } else if (density60 < 778) {
    return { k0: 2680.3206 * 5 / 9, k1: -0.00336312 * 5 / 9 }; // Transition
  } else if (density60 < 839) {
    return { k0: 594.5418 * 5 / 9, k1: 0 };                    // Jet fuels / Kerosene
  } else {
    return { k0: 186.9696 * 5 / 9, k1: 0.4862 * 5 / 9 };       // Diesel / Fuel oils
  }
}

export function correctApiGravity5B(observedApi, tempF) {
  // Observed API -> observed density (kg/m³)
  const sgObs = 141.5 / (observedApi + 131.5);
  let densityObs = sgObs * 999.016;

  const dTh = tempF - 60;
  const hyc = 1 - 0.00001278 * dTh - 0.0000000062 * dTh * dTh;
  densityObs = densityObs * hyc;

  const dT = tempF - 60;  // ΔT in °F — no conversion needed

  // Iterate to convergence
  let density60 = densityObs;
  let lastDensity = 0;
  let iterations = 0;

  while (Math.abs(density60 - lastDensity) > TOLERANCE && iterations < MAX_ITERATIONS) {
    lastDensity = density60;

    const { k0, k1 } = getKConstants6B(density60);
    const alpha = (k0 + k1 * density60) / (density60 * density60);
    const vcf = Math.exp(-alpha * dT * (1 + 0.8 * alpha * dT));

    density60 = densityObs / vcf;
    iterations++;
  }

  // Final values
  const { k0, k1 } = getKConstants6B(density60);
  const alpha = (k0 + k1 * density60) / (density60 * density60);
  const vcf = Math.exp(-alpha * dT * (1 + 0.8 * alpha * dT));

  const sg = density60 / 999.016;
  const correctedApi = (141.5 / sg) - 131.5;

  return {
    correctedApi: Math.round(correctedApi * 10) / 10,
    densityAt60F: Math.round(density60 * 10) / 10,
    density15: Math.round(density60 * 10) / 10,
    densityLbFt3: Math.round(density60 * 0.062428 * 1000) / 1000,
    sg: Math.round(sg * 10000) / 10000,
    lbsPerGal: Math.round(density60 * 0.008345 * 1000) / 1000,
    vcf: Math.round(vcf * 10000) / 10000,
    iterations,
    standard: 'ASTM 5B/6B',
  };
}

/**
 * Meter Calibration Factor — reverse of API correction.
 * Given a known corrected API (@60°F) and a product temperature,
 * returns the VCF factor and the density/weight at that temperature.
 * No iteration needed: the reference density is already known.
 */
export function calculateMeterFactor(correctedApi, productTempF) {
  // Corrected API -> density at 60°F
  const sg60 = 141.5 / (correctedApi + 131.5);
  const density60 = sg60 * 999.016;

  const dT = productTempF - 60;

  // Alpha from the 60°F reference density (Table 6B constants)
  const { k0, k1 } = getKConstants6B(density60);
  const alpha = (k0 + k1 * density60) / (density60 * density60);

  // The factor the technician is looking for
  const vcf = Math.exp(-alpha * dT * (1 + 0.8 * alpha * dT));

  // Density at product temperature
  const densityAtTemp = density60 * vcf;
  const sgAtTemp = densityAtTemp / 999.016;
  const apiAtTemp = (141.5 / sgAtTemp) - 131.5;

  return {
    vcf: Math.round(vcf * 10000) / 10000,
    density60: Math.round(density60 * 10) / 10,
    lbsPerGal60: Math.round(density60 * 0.008345 * 1000) / 1000,
    densityAtTemp: Math.round(densityAtTemp * 10) / 10,
    lbsPerGalAtTemp: Math.round(densityAtTemp * 0.008345 * 1000) / 1000,
    densityLbFt3AtTemp: Math.round(densityAtTemp * 0.062428 * 1000) / 1000,
    sgAtTemp: Math.round(sgAtTemp * 10000) / 10000,
    apiAtTemp: Math.round(apiAtTemp * 10) / 10,
    deltaT: Math.round(dT * 10) / 10,
  };
}

/**
 * Compressibility Factor (F) — API MPMS Chapter 11.2.1
 * Used for CPL (Correction for Pressure on Liquid) in meter calibration.
 * Returns F in per-psi units, plus the table-style value (F × 100000).
 *
 * F = exp(-1.9947 + 0.00013427*T + (793920 + 2326*T) / rho60^2)
 *   T    = temperature in °F
 *   rho60 = density at 60°F in kg/m³
 */
export function calculateCompressibility(api60, tempF, pressurePsi = null) {
  const sg60 = 141.5 / (api60 + 131.5);
  const density60 = sg60 * 999.016;

  const exponent =
    -1.9947 +
    0.00013427 * tempF +
    (793920 + 2326 * tempF) / (density60 * density60);

  const tableValue = Math.exp(exponent);   // this is F × 100000
  const fPerPsi = tableValue / 100000;

  // CPL only if a pressure is supplied
  let cpl = null;
  if (pressurePsi !== null && !isNaN(pressurePsi)) {
    cpl = 1 / (1 - fPerPsi * pressurePsi);
  }

  return {
    tableValue: Math.round(tableValue * 1000) / 1000,
    fPerPsi: fPerPsi,
    cpl: cpl !== null ? Math.round(cpl * 100000) / 100000 : null,
    density60: Math.round(density60 * 10) / 10,
    sg60: Math.round(sg60 * 10000) / 10000,
    lbsPerGal60: Math.round(density60 * 0.008345 * 1000) / 1000,
    // what the paper table would give you after rounding to 0.5 steps
    roundedApi: Math.round(api60 * 2) / 2,
    roundedTemp: Math.round(tempF * 2) / 2,
  };
}