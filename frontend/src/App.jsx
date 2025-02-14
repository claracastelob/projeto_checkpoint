import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from "./routes/Routes"

export default function App() {
  return(
    <Router>
      <div className="app">
        <AppRoutes />
      </div>
    </Router>
  )
}