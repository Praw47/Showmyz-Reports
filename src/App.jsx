import '../src/App.css'
import { Delivery } from './components/Delivery'
import { SpeedInsights } from '@vercel/speed-insights/react'

function App() {

  return (
    <>
      <Delivery/>
      <SpeedInsights />
    </>
  )
}

export default App
