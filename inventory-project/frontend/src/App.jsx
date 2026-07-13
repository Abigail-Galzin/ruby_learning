import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import ProductsIndex from '../src/pages/Products/ProductsIndex'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ProductsIndex></ProductsIndex>
    </>
  )
}

export default App
