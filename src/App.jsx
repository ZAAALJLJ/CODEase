import Navbar from "./Navbar"
import Pricing from "./pages/Pricing"
import Home from "./pages/Home"
import Simulation from "./pages/Simulation"
import Profile from "./pages/Profile"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/CODEase" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

      </div>
    </>
  )
}

export default App