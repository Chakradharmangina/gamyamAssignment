import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import './App.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-cyan/theme.css';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
