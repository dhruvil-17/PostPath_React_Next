import React from 'react';
import MouseTracker from './components/RenderProps/logic';

function App() {

  return (
    <>
      <MouseTracker 
      render={(x)=> <h1>Mouse x: {x}</h1>}/>
    </>
      
  );
}

export default App;
