import React from 'react';
import { useSessionStorage, useLocalStorage } from "../_helpers/useStorage"

function Storage() {
  const [name, setName, removeName] = useSessionStorage("name", "Kyle")
  const [age, setAge, removeAge] = useLocalStorage("age", 26)

  return (
    <div>
      <div>
        {name} - {age}
      </div>
      <button onClick={() => setName("John")}>Set Name</button>
      <button onClick={() => setAge(40)}>Set Age</button>
      <button onClick={removeName}>Remove Name</button>
      <button onClick={removeAge}>Remove Age</button>
    </div>
  )
}

export { Storage };