export default function deepEqual(
  object1: Record<string, unknown>,
  object2: Record<string, unknown>
): boolean {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects &&
        !deepEqual(
          val1 as Record<string, unknown>,
          val2 as Record<string, unknown>
        )) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
}
function isObject(object: unknown): boolean {
  return object != null && typeof object === 'object';
}
