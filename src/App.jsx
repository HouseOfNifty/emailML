import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from "./routes/header";
import About from "./routes/about/about";
import Dashboard from "./routes/dashboard/dashboard";
import Home from "./routes/home/home";
import Demo from "./routes/demo/demo";
import Register from "./routes/register/register";
function App() {
  const [count, setCount] = useState(0)

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="demo" element={<Demo />} />
          <Route path="register" element={<Register />} />
          <Route index element={<Home/>} />
        </Route>
      </Routes>
    </Router>

  )
};

export default App
