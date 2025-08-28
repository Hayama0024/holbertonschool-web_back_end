export default function hasValuesFromArray(set, array) {
    if (!(set instanceof Set) || !Array.isArray(array)) return false;
    return array.every((item) => set.has(item));
  }
  