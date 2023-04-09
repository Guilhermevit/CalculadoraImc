import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Formulario from "./components/Formulario/Formulario";
import Resultado from "./components/Resultado/Resultado";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Formulario />} />
          <Route path="/resultado" element={<Resultado />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
