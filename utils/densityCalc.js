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