import React from "react";
import "./App.css";
// import PokemonList from "./components/Pokemons/PokemonList";
import Routes from "./router/routes";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
