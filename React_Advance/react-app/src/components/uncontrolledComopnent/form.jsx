import { useRef } from "react";

export default function UncontrolledInput() {
  const inputRef = useRef();

  const handleSubmit = () => {
    alert(inputRef.current.value);
  };

  return (
    <div>
      <input ref={inputRef} className="border-2" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
