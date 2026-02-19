import React from 'react';
import { useState } from 'react';


function slowFunction(num) {
  console.log("Calculating...");
  for (let i = 0; i < 1000000000; i++) {} // slow loop
  return num * 2;
}

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const result = React.useMemo(() => {
    return slowFunction(count);
  }, [count]);

  return (
    <>
      <button onClick={() => setCount(count + 1)} className='border-2'>
        Increase
      </button>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      className=' border-2 '/>

      <p>Result: {result}</p>
    </>
  );
}
export default App;