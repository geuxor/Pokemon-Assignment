import { Switch, Route } from "react-router-dom";
import PokemonCard from "../components/Pokemons/PokemonCard";
import PokemonDetails from "../components/Pokemons/PokemonDetails";
import PokemonPage from "../components/Pokemons/PokemonPage";

function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/pokemon/:name" exact component={PokemonDetails} />
        <Route path="/pokemons/:name" exact component={PokemonCard} />
        <Route path="/" exact component={PokemonPage} />
      </Switch>
    </div>
  );
}

export default Routes;
