import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

// Importando componentes. //
import Navbar from "./components/Navbar"
import Home from "./components/Home";
import Penaltys from "./components/Penaltys";
import Informacion from "./components/Informacion";

function App() {
  return (
    <Router>
      <div className="App">
      
        <header className="App-header">
          <Navbar></Navbar>
        </header>

        
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/penaltys" element={<Penaltys/>}></Route>
            <Route path="/informacion" element={<Informacion/>}></Route>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
