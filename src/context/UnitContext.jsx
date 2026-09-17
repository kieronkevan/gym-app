import { createContext, useContext, useState, useCallback } from 'react';
import { getUnit, setUnit as persistUnit } from '../lib/storage.js';

const UnitContext = createContext(null);

export function UnitProvider({ children }) {
  const [unit, setUnitState] = useState(() => getUnit());

  const setUnit = useCallback((next) => {
    setUnitState(next);
    persistUnit(next);
  }, []);

  return (
    <UnitContext.Provider value={{ unit, setUnit }}>
      {children}
    </UnitContext.Provider>
  );
}

export function useUnit() {
  const ctx = useContext(UnitContext);
  if (!ctx) throw new Error('useUnit must be used within a UnitProvider');
  return ctx;
}
