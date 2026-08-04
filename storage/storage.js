import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'fuelops:records';
const MAX_RECORDS = 200;

/**
 * A record is:
 * {
 *   id: string,
 *   type: 'density' | 'meter' | 'compressibility',
 *   createdAt: ISO string,
 *   tank: string,          // free text, optional
 *   note: string,          // free text, optional
 *   inputs: {...},         // whatever the screen fed in
 *   outputs: {...},        // the calculated values worth keeping
 * }
 */

export async function getRecords() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('getRecords failed', e);
    return [];
  }
}

export async function saveRecord(record) {
  try {
    const records = await getRecords();
    const withId = {
      ...record,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
    };
    const next = [withId, ...records].slice(0, MAX_RECORDS);
    await AsyncStorage.setItem(KEY, JSON.stringify(next));
    return withId;
  } catch (e) {
    console.warn('saveRecord failed', e);
    return null;
  }
}

export async function deleteRecord(id) {
  try {
    const records = await getRecords();
    await AsyncStorage.setItem(KEY, JSON.stringify(records.filter(r => r.id !== id)));
    return true;
  } catch (e) {
    console.warn('deleteRecord failed', e);
    return false;
  }
}

export async function clearRecords() {
  try {
    await AsyncStorage.removeItem(KEY);
    return true;
  } catch (e) {
    console.warn('clearRecords failed', e);
    return false;
  }
}