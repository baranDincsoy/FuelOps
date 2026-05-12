import AsyncStorage from '@react-native-async-storage/async-storage';

// TANKS
export async function saveTank(tank) {
  const tanks = await getTanks();
  const existing = tanks.findIndex(t => t.id === tank.id);
  if (existing >= 0) {
    tanks[existing] = tank;
  } else {
    tanks.push(tank);
  }
  await AsyncStorage.setItem('tanks', JSON.stringify(tanks));
}

export async function getTanks() {
  const data = await AsyncStorage.getItem('tanks');
  return data ? JSON.parse(data) : [];
}

export async function deleteTank(id) {
  const tanks = await getTanks();
  const filtered = tanks.filter(t => t.id !== id);
  await AsyncStorage.setItem('tanks', JSON.stringify(filtered));
}

// SOUNDING RECORDS
export async function saveSoundingRecord(record) {
  const records = await getSoundingRecords();
  records.unshift(record);
  await AsyncStorage.setItem('soundingRecords', JSON.stringify(records));
}

export async function getSoundingRecords() {
  const data = await AsyncStorage.getItem('soundingRecords');
  return data ? JSON.parse(data) : [];
}

// DENSITY RECORDS
export async function saveDensityRecord(record) {
  const records = await getDensityRecords();
  records.unshift(record);
  await AsyncStorage.setItem('densityRecords', JSON.stringify(records));
}

export async function getDensityRecords() {
  const data = await AsyncStorage.getItem('densityRecords');
  return data ? JSON.parse(data) : [];
}