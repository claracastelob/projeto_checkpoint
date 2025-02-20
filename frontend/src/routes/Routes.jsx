import {Routes, Route} from "react-router-dom"
import Home from "../pages/Home/Home"
import Login from "../pages/Login/Login"
import CreateAccount from "../pages/CreateAccount/CreateAccount"
import LibraryPage from "../pages/LibraryPage/Library"
import Configuration from "../pages/ConfigurationsPage/Configuration"

export default function AppRoutes() {
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/createAccount" element={<CreateAccount />}/>
      <Route path="/myLibrary" element={<LibraryPage />}/>
      <Route path="/configurations" element={<Configuration />}/>
    </Routes>
  )
}
