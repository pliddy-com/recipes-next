/*
 * Types a promise as resolved
 * @link https://timm.preetz.name/articles/typescript-async-function-return-value
 * */
export type ResolvedPromise<T> = T extends Promise<infer R> ? R : never;

/*
 * Check if the value arg is null or undefined.
 * Useful for use in Array.prototype.filter() where TS can't infer without a type guard.
 */
export function notNullOrUndefined<TValue>(
  value: TValue
): value is NonNullable<TValue> {
  return value !== null && value !== undefined;
}
