/*
 * Check if the value arg is null or undefined.
 * Useful for use in Array.prototype.filter() where TS can't infer without a type guard.
 */
export function hasValue<TValue>(value: TValue): value is NonNullable<TValue> {
  return value !== null && value !== undefined;
}

export const minToIso = (num: number) => {
  const hours = Math.floor(num / 60);
  const min = Math.floor(num % 60);
  return `PT${hours > 0 ? `${hours}H` : ''}${min}M`;
};

export const minToTime = (num: number) => {
  const hours = Math.floor(num / 60);
  const min = Math.floor(num % 60);
  return `${hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : ''}${
    hours && min ? ' ' : ''
  }${min > 0 ? `${min} minutes` : ''}`;
};
