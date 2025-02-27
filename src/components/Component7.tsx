import React, { useContext } from "react";
import MyContext from "../utils/MyContext"; // Impor dari file MyContext.tsx

const Component7: React.FC = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("Component7 must be used within a MyContext.Provider");
  }

  const { count, setCount } = context;

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Tambah</button>
    </div>
  );
};

export default Component7;
