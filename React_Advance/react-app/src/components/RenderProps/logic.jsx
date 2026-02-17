import { useState } from "react";
export default function MouseTracker({ render }) {
  const [x, setX] = useState(0);

  return (
    <div onMouseMove={(e) => setX(e.clientX)}>
      {render(x)}
    </div>
  );
}
