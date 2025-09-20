export type BatchResult<T, U> = {
  success: T[];
  fail: U[];
};
