import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1 className="text-3xl mb-3">Hello world!</h1>
      <button className="px-5 py-2 border border-solid border-blue-300 text-blue-300 rounded-xl" onClick={() => setCount(prevCount => prevCount+1)}>{count}</button>
    </div>
  )
}

export default App
