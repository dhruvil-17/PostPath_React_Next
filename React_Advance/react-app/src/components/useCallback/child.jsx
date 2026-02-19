import React, { useCallback } from 'react';
import { useState } from 'react';
// import Child from './components/useCallback/child';
function App() {

    const [count, setCount] = useState(0);
   const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);



  return (
    <>
      <button onClick={()=> setCount(count+1)} className='border-2 m-2 p-2'>Increase {count}</button>
      <button onClick={handleClick} className='border-2 m-2 p-2'>Click Me</button>
    </>
      
  )
  
}

export default App;
//just an example