import { useState } from 'react'
import './App.css'
import EmployeeTable from './Components/EmployeeTable'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <EmployeeTable/>
    </>
  )
}

export default App
