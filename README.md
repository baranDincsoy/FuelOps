# FuelOps ⚓

![Language](https://img.shields.io/badge/Language-JavaScript-yellow) ![Framework](https://img.shields.io/badge/Framework-React%20Native-blue) ![Platform](https://img.shields.io/badge/Platform-Android-green) ![Standard](https://img.shields.io/badge/Standard-ASTM%20D1250-orange)

A mobile fuel calculation tool for aviation, marine, and tank farm operators. Built with **React Native** and **Expo**, it replaces the analog Gammon GTP-3012-1A API gravity wheel and the printed compressibility tables still used daily in fuel operations.

---

## 📱 App Screenshots

<img width="480" height="1016" alt="Ekran görüntüsü 2026-08-05 172413" src="https://github.com/user-attachments/assets/cce1b2ae-fff2-43e7-8077-a02bbe18e9b1" /> <img width="475" height="995" alt="Ekran görüntüsü 2026-08-05 172442" src="https://github.com/user-attachments/assets/306befc9-b190-4f37-9c52-c4c373248566" /> <img width="472" height="1003" alt="Ekran görüntüsü 2026-08-05 172558" src="https://github.com/user-attachments/assets/8fd8fa53-4730-4604-822c-a57707ddf8e4" />
<img width="474" height="1009" alt="Ekran görüntüsü 2026-08-05 172548" src="https://github.com/user-attachments/assets/f482843e-18ee-40e5-a1ee-0acd673ed56d" /> <img width="463" height="998" alt="Ekran görüntüsü 2026-08-05 172536" src="https://github.com/user-attachments/assets/857f82fa-4395-418a-a55c-80a6bb40fc98" /> 




---

## 🎯 Field Validation

This is the part that matters most. The calculations were verified against the physical instruments and printed tables used in daily airport fuel operations — not just against textbook formulas.

| Raw API | Temp | Wheel | FuelOps |
|:---:|:---:|:---:|:---:|
| 44.5 | 76°F | 43.1 | 43.1 |
| 45.5 | 83°F | 43.5 | 43.5 |
| 47.0 | 97°F | 43.7 | 43.7 |
| 45.5 | 86°F | 43.2 | 43.2 |
| 45.3 | 84°F | 43.2 | 43.2 |
| 45.5 | 89°F | 43.0 | 43.0 |

Reference sources: Gammon GTP-3012-1A API gravity wheel, ATA Form 103.08 fuel quality records, and printed compressibility factor tables.

**Two corrections were only discovered through field testing** — no textbook would have flagged them:

* **Hydrometer glass expansion (HYC).** Early results drifted low, and the drift grew with ΔT. The glass of the hydrometer itself expands with temperature; API 11.1 corrects for this. Adding it closed the gap across the full temperature range.
* **Weight in air vs. weight in vacuum.** Metric density is defined in vacuum, but the API lb/gallon tables report weight in air. Subtracting air buoyancy (0.0011 g/mL) brought lb/gal into agreement with the field records — a 0.009 lb/gal difference that would otherwise look like a bug to any operator checking the app against their chart.

A third detail came from the same testing: displayed values are now derived from the **rounded** corrected API rather than the internal high-precision value. The difference is 0.001 in specific gravity — invisible to the physics, but it means every number on screen agrees with every other number, and with the operator's wheel.

---

## 🌟 What It Does

### Compressibility Factor
Replaces the printed *Compressibility Factors per PSI* tables used in fuel cart and meter calibration. Implements API MPMS Chapter 11.2.1 directly, so it works at any input rather than the 0.5-step grid the paper tables are limited to — and covers the full 0–90° API range instead of the narrow band a printed page can fit.

### API Gravity Correction
The digital equivalent of the Gammon wheel: observed API + fuel temperature → corrected API at 60°F, with density, specific gravity, and lb/gallon alongside. Switchable between **ASTM 5B/6B** (US, 60°F reference) and **ASTM 54B** (metric, 15°C reference).

### Meter Calibration Factor
The inverse operation, for calibration technicians: corrected API + product temperature → the correction factor, plus density and lb/gallon at that temperature.

### Unit Converter
Volume (L, m³, US gal, bbl), weight (kg, tons, lbs, long tons), temperature (°C, °F, K), length (cm, in, mm, m, ft), and a density-bridged quantity converter for volume ↔ mass.

### Saved Records
Calculations can be tagged with a tank or cart number and stored on-device, so field readings survive until they reach the paper form.

---

## 🔬 The Math

Most fuel calculator apps take shortcuts. This one implements the standard as written:

* **Iterative convergence.** Standard density is needed to find the thermal expansion coefficient, but the coefficient is needed to find standard density. ASTM resolves this with iteration to a tolerance, not a single pass.
* **Dynamic K₀/K₁ constants.** The coefficients are selected per fuel class (gasolines, transition, jet fuels/kerosene, diesels) *inside* the loop, so a density that crosses a boundary during convergence lands on the right constants.
* **True 6B constants for the US standard.** The 60°F-referenced constants are the 15°C ones scaled by 5/9, since 1°F = 5/9 °C. An earlier version used an empirical fudge factor to bridge the two references; it fit the data but wasn't defensible. It's gone.
* **Automatic fuel type detection** from the corrected API range.

---

## 🏗 Architecture

The app follows an MVVM-equivalent separation, adapted to React Native's idioms:

| Layer | Location | Responsibility |
|---|---|---|
| **Model** | `/utils`, `/storage` | Pure functions and persistence. No state, no UI. |
| **ViewModel** | `/hooks` | State, input parsing, validation, orchestration. Custom hooks stand in for ViewModels. |
| **View** | `/screens`, `/components` | JSX only. No business logic. |
| **Styling** | `/styles` | One StyleSheet module per screen. |

The unit converter shows why this pays off: volume, weight, and length all run through a single `useUnitConverter` hook driven by a unit table — adding a new category means adding a table, not a screen.

Navigation is a custom drawer built on React Native's own `Animated` API. `react-native-reanimated` kept colliding with the new Android architecture through TurboModule errors, so the dependency was dropped entirely in favour of ~80 lines of first-party code.

---

## 🛠 Tech Stack

* **Language:** JavaScript (ES6+)
* **Framework:** React Native, Expo SDK 54
* **Navigation:** Custom drawer (no third-party navigation dependency)
* **State:** React Hooks
* **Storage:** AsyncStorage
* **Build:** EAS Build (cloud Android APK)

---


## 🔮 Roadmap

* **Fuel spec limits reference** — density, flash point, and freeze point limits per ASTM D1655, D975, D4814.
* **Wider validation** — current field data covers 44–47° API (jet fuel). Diesel and AVGAS bands are untested against physical instruments.
* **PDF export** for shift handover.
* **iOS build** — Android-only for now, pending Apple Developer enrollment.

---

## 💡 Why I Built This

I'm a tank farm mechanic transitioning into software engineering. Every shift, operators reach for a plastic wheel chart and a photocopied table — tools unchanged for decades. There was no good digital alternative built by someone who actually understood the operations.

So I built one.

The most useful thing I learned wasn't a framework. It was that in engineering software, the physics is the test suite. Twice the code ran cleanly, looked right, and was wrong — and both times the tell was a number that felt off to someone who'd stood next to the hydrometer. Domain knowledge caught what unit tests wouldn't have.

---

## ⚠️ Disclaimer

Calculations are provided as an engineering aid. They must not be used as the sole basis for custody transfer, billing, or safety-critical decisions.

---

## 📄 License

See [LICENSE](LICENSE). Published for portfolio review; not licensed for redistribution.

---

Developed by **Baran Cenk Dincsoy**
