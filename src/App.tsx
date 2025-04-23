import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import FormPage from "./pages/FormPage"
import HomeWork from "./pages/HomeWork"
import FormData from "./pages/FormData"
import Component1 from "./components/Component1"
import EmployeesPage from "./pages/EmployeesPage"


const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/homework" element={<HomeWork />} />
        <Route path="/formdata" element={<FormData />} />
        <Route path="/count" element={<Component1 />} />
        <Route path="/employees" element={<EmployeesPage />} />
      </Routes>
    </>
  )
}

export default App









