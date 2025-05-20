export function getStorageValue(key, defaultValue) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (e) {
    console.log("Error reading from local storage", e);
    return defaultValue;
  }
}

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

export function removeStorageValue(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    console.log("Error removing from local storage", e);
    return false;
  }
}
