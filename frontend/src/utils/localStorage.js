// set login auth to local storage
export const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

// remove login auth to local storage
export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key)
}

// set login auth to local storage
export const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key))
}
