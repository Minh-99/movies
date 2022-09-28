export function setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getLocalStorage(key: string) {
  const value: string | null = localStorage.getItem(key)
  return value ? JSON.parse(value) : null
}

export function removeLocalStorage(key: string) {
  localStorage.removeItem(key)
}

export function clearLocalStorage() {
  localStorage.clear()
}

export default {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  clearLocalStorage,
}
