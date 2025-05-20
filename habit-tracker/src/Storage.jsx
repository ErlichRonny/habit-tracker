// Gets value from local storage
// Parameter: key - the key to retrieve, defaultValue - the value to return if key is not found
export function getStorageValue(key, defaultValue) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (e) {
    console.log("Error reading from local storage", e);
    return defaultValue;
  }
}
// Sets value in local storage
// Parameter: key - the key to set, value - the value to store
export function setStorageValue(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // returning makes function easier to test
    return true;
  } catch (e) {
    console.log("Error setting value in storage:", e);
    return false;
  }
}
// Removes value from local storage
// Parameter: key - the key to remove
export function removeStorageValue(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    console.log("Error removing from local storage", e);
    return false;
  }
}
