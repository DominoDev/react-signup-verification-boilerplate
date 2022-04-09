import { useCallback, useState, useEffect } from "react"

export function useStorage(key, defaultValue, persist) {

  if(persist){
    return _useStorage(key, defaultValue, window.localStorage)
  }else{
    return _useStorage(key, defaultValue, window.sessionStorage)  
  }
  
}

export function useLocalStorage(key, defaultValue) {
  return _useStorage(key, defaultValue, window.localStorage)
}

export function useSessionStorage(key, defaultValue) {
  return _useStorage(key, defaultValue, window.sessionStorage)
}

function _useStorage(key, defaultValue, storageObject) {
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof defaultValue === "function") {
      return defaultValue()
    } else {
      return defaultValue
    }
  })

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key)
    storageObject.setItem(key, JSON.stringify(value))
  }, [key, value, storageObject])

  const remove = useCallback(() => {
    setValue(undefined)
  }, [])

  return [value, setValue, remove]
}