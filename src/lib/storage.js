export function getStoredValue(key, fallbackValue) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallbackValue
  } catch {
    return fallbackValue
  }
}

export function setStoredValue(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
