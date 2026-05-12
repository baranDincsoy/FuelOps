
# FuelOps ⚓

![Language](https://img.shields.io/badge/Language-JavaScript-yellow) ![Framework](https://img.shields.io/badge/Framework-React%20Native-blue) ![Platform](https://img.shields.io/badge/Platform-Android-green) ![Standard](https://img.shields.io/badge/Standard-ASTM%20D1250-orange)

A cross-platform mobile fuel calculation tool built for aviation, marine, and tank farm operators. Built with **React Native** and **Expo**, this project replaces the analog Gammon GTP-3012-1A API gravity wheel chart with a digital, standards-compliant calculator used industry-wide.

---

## 📱 App Screenshots

| Home (VCF) | Density (API) | Converter | Quantity |
|:---:|:---:|:---:|:---:|
| <img width="403" height="853" alt="home png" src="https://github.com/user-attachments/assets/cfecdc92-8ecd-4948-80a8-09e4b1c753de" /> | <img width="378" height="833" alt="density png" src="https://github.com/user-attachments/assets/a3049bf3-0426-44c9-99b0-d0d21c12642e" /> | <img width="392" height="852" alt="converter1 png" src="https://github.com/user-attachments/assets/3d102a06-051a-4d9f-aa6c-24c724f4fe80" /> | <img width="389" height="854" alt="converter2 png" src="https://github.com/user-attachments/assets/a4467539-dc46-4f86-a4c1-005f9836cd13" /> | <img width="408" height="852" alt="converter3 png" src="https://github.com/user-attachments/assets/9ea49fa4-27b7-4e9d-bceb-2792f8a7a44a" /> | <img width="390" height="847" alt="converter4 png" src="https://github.com/user-attachments/assets/dc2d7dc5-e8db-4f14-98e6-df5117151cbc" /> |<img width="397" height="832" alt="quantity png" src="https://github.com/user-attachments/assets/ac06b7b0-fef8-4f36-8ee5-78c5bb303fec" />





---

## 🌟 Beyond a Generic Calculator (Real Industry Math)

While most fuel calculator apps use hardcoded shortcuts, **I implemented the full ASTM D1250 Table 54B standard** the way petroleum engineers actually use it in custody-transfer operations:

* **Iterative Convergence Loop:** Resolves the "chicken-and-egg" problem between observed and standard density. Most calculator apps skip this and lose accuracy on hot pipelines.
* **Dynamic K₀/K₁ Constants:** Selects the correct thermal expansion coefficients per fuel class (Gasolines, Jet Fuels, Diesels) inside the iteration — not hardcoded averages.
* **Physical Correctness:** Early versions had a sign bug (API moved the wrong direction with temperature). Debugging this taught me that in engineering software, fluid physics is the unit test.
* **Auto Fuel Detection:** Identifies the fuel type from corrected API range — JET A, AVGAS, MOGAS, Marine Diesel, etc.
* **Bilingual Units:** Full °C/°F and metric/imperial parity. A tank farm in Houston and a refinery in Rotterdam use the same app.

---

## 🛠 Tech Stack & Libraries

* **Language:** JavaScript (ES6+)
* **Framework:** React Native with Expo SDK 54
* **Navigation:** React Navigation (Bottom Tabs)
* **State Management:** React Hooks (`useState`)
* **Storage:** AsyncStorage
* **Build:** EAS Build (Cloud Android APK)

---

## 🏗 Architecture

The app follows a **separation-of-concerns** pattern for maintainability and testing:

1. **`/utils`:** Pure calculation modules (`densityCalc.js`) — no UI, no state, just math. Easy to unit test.
2. **`/screens`:** UI composition only — each screen wires inputs to utility functions.
3. **`/styles`:** Dedicated StyleSheet modules per screen — no inline styles cluttering the JSX.
4. **`/storage`:** AsyncStorage wrappers for future persistence features.

This separation made debugging the iterative density algorithm straightforward — when the math broke, I knew exactly which file to open.

---

## 🚀 How to Run

1. Clone this repository:
```bash
   git clone https://github.com/baranDincsoy/FuelOps.git
```
2. Install dependencies:
```bash
   cd FuelOps
   npm install
```
3. Start the development server:
```bash
   npx expo start
```
4. Scan the QR code with **Expo Go** on your Android device, or press `a` to launch an emulator.

---

## 🔮 Future Improvements

* **Tank Calibration Module:** Sounding → Volume → Mass with trim correction (currently shelved due to user-input overhead in field conditions).
* **Consumption Tracking:** Persistent daily measurements for fuel consumption analysis.
* **PDF Reports:** Export shift summaries for handover.
* **Cloud Sync:** Multi-device sync for fleet operations.
* **iOS Build:** Currently Android-only; iOS support pending Apple Developer enrollment.

---

## 💡 Why I Built This

I'm a tank farm mechanic transitioning into software engineering. Every shift, I watched operators reach for the analog Gammon API gravity wheel chart — a tool unchanged for decades. There was no good digital alternative built by someone who actually understood the operations.

So I built one.

This app sits at the intersection of my two careers: industrial fuel operations and clean software engineering. The physics came from years on tankers and tank farms. The code came from 43 weeks of self-study.

---

Developed by **Baran Cenk Dincsoy**
