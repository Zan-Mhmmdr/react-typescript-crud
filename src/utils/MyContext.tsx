import { createContext } from "react";

// Definisikan tipe untuk context
interface MyContextType {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
}

// Buat context dengan tipe MyContextType
const MyContext = createContext<MyContextType | undefined>(undefined);

export default MyContext;
