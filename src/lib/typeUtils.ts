/*
 * Check if the value arg is null or undefined.
 * Useful for use in Array.prototype.filter() where TS can't infer without a type guard.
 */
export function hasValue<TValue>(value: TValue): value is NonNullable<TValue> {
  return value !== null && value !== undefined;
}
