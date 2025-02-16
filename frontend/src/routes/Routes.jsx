import {Routes, Route} from "react-router-dom"
import Home from "../pages/Home/Home"
import Login from "../pages/Login/Login"
import CreateAccount from "../pages/CreateAccount/CreateAccount"
import MainPage from "../pages/MainPage/MainPage"

export default function AppRoutes() {
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/createAccount" element={<CreateAccount />}/>
      <Route path="/mainPage" element={<MainPage />}/>
    </Routes>
  )
}
