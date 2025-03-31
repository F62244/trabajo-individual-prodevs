import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import {CssBaseline, Container, Box} from '@mui/material';
import "./App.css";

// Importando componentes. //
import Navbar from "./components/Navbar"
import Penaltys from "./components/Penaltys";
import Informacion from "./components/Informacion";
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <CssBaseline></CssBaseline>
      <Box display="flex" flexDirection="column" minHeight="100vh">
     
      
        <header>
          <Navbar></Navbar>
        </header>
          <Box component="main" flex={1} sx={{backgroundImage:'url(/assets/fondo-futbol.jpg)', backgroundRepeat:'no-repeat', backgroundSize:'cover'}}>
            <Container Width="lg" sx={{py:6}}>
              <Routes>
                <Route path="/" element={<Penaltys/>}></Route>
                <Route path="/informacion" element={<Informacion/>}></Route>
              </Routes>
            </Container>
          </Box>
          <footer>
            <Footer></Footer>
          </footer>
        </Box>
    </Router>
  );
}

export default App;
