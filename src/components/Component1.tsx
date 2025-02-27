import React, { useState } from "react";
import Component7 from "./Component7";
import MyContext from "../utils/MyContext"; // Impor dari file MyContext.tsx

const Component1: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    return (
        <div>
            {/* Provider dengan tipe context */}
            <MyContext.Provider value={{ count, setCount }}>
                <Component7 />
            </MyContext.Provider>
        </div>
    );
};

export default Component1;
