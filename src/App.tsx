import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AllPokemons } from "./pages/all-pokemons/AllPokemons";
import { MyPokemons } from "./pages/my-pokemons/MyPokemons";
import { Fight } from "./pages/fight/Fight";

import { AppHeader } from "./components/app-header/AppHeader";

import { GlobalStyles } from "./assets/style/setup/globalStyles"

function App() {

  return (
  <Router>
    <GlobalStyles />
    <AppHeader/>
    <Routes>
      <Route path="/allPokemons" element={<AllPokemons />} />
      <Route path="/myPokemons" element={<MyPokemons />} />
      <Route path="/fight" element={<Fight />} />
    </Routes>
  </Router>
  )
}

export default App
