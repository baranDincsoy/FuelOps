import { useState } from 'react';
import { saveRecord } from '../storage/storage';

export function useSaveRecord() {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  async function save(record) {
    setSaving(true);
    const result = await saveRecord(record);
    setSaving(false);
    if (result) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    return result;
  }

  function reset() { setSaved(false); }

  return { save, saved, saving, reset };
}