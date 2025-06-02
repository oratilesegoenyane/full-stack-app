import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Home from "./components/Home"
import Employees from "./components/Employees"
import Department from "./components/Department"
import "./index.css"

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <h1 className="nav-title">Employee Directory</h1>
            <ul className="nav-links">
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/employees" className="nav-link">
                  All Employees
                </Link>
              </li>
              <li>
                <Link to="/department" className="nav-link">
                  By Department
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/department" element={<Department />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
