import { useEffect, useState } from 'react'
import { getStoredValue, setStoredValue } from '../lib/storage'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValueState] = useState(() => getStoredValue(key, initialValue))

  useEffect(() => {
    setStoredValue(key, storedValue)
  }, [key, storedValue])

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key !== key) return
      setStoredValueState(event.newValue ? JSON.parse(event.newValue) : initialValue)
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key, initialValue])

  return [storedValue, setStoredValueState]
}
