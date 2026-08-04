import { useState, useEffect, useCallback } from 'react';
import { getRecords, deleteRecord, clearRecords } from '../storage/storage';

export function useHistory() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const load = useCallback(async () => {
    setLoading(true);
    setRecords(await getRecords());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function remove(id) {
    await deleteRecord(id);
    setRecords(prev => prev.filter(r => r.id !== id));
  }

  async function clearAll() {
    await clearRecords();
    setRecords([]);
  }

  const visible = filter === 'all'
    ? records
    : records.filter(r => r.type === filter);

  return { records: visible, total: records.length, loading, filter, setFilter, reload: load, remove, clearAll };
}