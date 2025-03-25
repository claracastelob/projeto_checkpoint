import {Routes, Route} from "react-router-dom"
import Home from "../pages/Home/Home"
import Login from "../pages/Login/Login"
import CreateAccount from "../pages/CreateAccount/CreateAccount"
import LibraryPage from "../pages/LibraryPage/Library"
import Configuration from "../pages/ConfigurationsPage/Configuration"
import PasswordRecovery from "../pages/PasswordRecovery/PasswordRecovery"
import ProtectedRoute from "./ProtectedRoute"

export default function AppRoutes() {
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/createAccount" element={<CreateAccount />}/>
      <Route element={<ProtectedRoute />}>
        <Route path="/myLibrary" element={<LibraryPage />}/>
      </Route>
      <Route path="/configurations" element={<Configuration />}/>
      <Route path="/passwordRecovery" element={<PasswordRecovery />}/>
    </Routes>
  )
}
