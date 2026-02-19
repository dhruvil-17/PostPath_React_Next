 import React from 'react';
 
 const Child = React.memo(({ name }) => {
//   const [count, setCount] = React.useState(0);

  console.log("Child Rendered");

  return (
    <div>
      <h2>{name}</h2>
      {/* <p>Child Count: {count}</p> */}
      {/* <button onClick={() => setCount(count + 1)}>
        Increase Child Count
      </button> */}
    </div>
  );
});

export default Child;