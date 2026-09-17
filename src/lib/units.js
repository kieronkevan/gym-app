// Weight is always stored in kg internally. These two functions are the
// only place conversion happens — components should never do the maths
// themselves, so this stays the single source of truth if the formula
// or rounding ever needs to change.

const KG_TO_LB = 2.20462;

export function toDisplayWeight(weightKg, unit) {
  const value = unit === 'lb' ? weightKg * KG_TO_LB : weightKg;
  return Math.round(value * 10) / 10;
}

export function fromDisplayWeight(displayValue, unit) {
  const num = parseFloat(displayValue);
  if (Number.isNaN(num)) return 0;
  return unit === 'lb' ? num / KG_TO_LB : num;
}
