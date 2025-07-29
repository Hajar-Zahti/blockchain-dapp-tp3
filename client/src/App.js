import React from "react";
import { Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Exercice2 from "./pages/Exercice2";
import Exercice4 from "./pages/Exercice4";
import Exercice6 from "./pages/Exercice6";
import Exercice8 from "./pages/Exercice8";
import Exercice1 from "./pages/Exercice1";
import Exercice3 from "./pages/Exercice5";
import Exercice5 from "./pages/Exercice5";
import Exercice7 from "./pages/Exercice7";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/ex1" element={<Exercice1 />} />
      <Route path="/ex2" element={<Exercice2 />} />
      <Route path="/ex3" element={<Exercice3 />} />
      <Route path="/ex4" element={<Exercice4 />} />
      <Route path="/ex5" element={<Exercice5 />} />
      <Route path="/ex6" element={<Exercice6 />} />
      <Route path="/ex7" element={<Exercice7 />} />
      <Route path="/ex8" element={<Exercice8 />} />
      {/* Tu peux ajouter les autres routes ici */}
    </Routes>
  );
}

export default App;
