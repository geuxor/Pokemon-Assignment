import axios from "axios";
const pokemonApi = {};

pokemonApi.getPokemons = async () => {
  return await axios.get(`${process.env.REACT_APP_POKEMON_API}/pokemon`);
};

pokemonApi.getAbilityPokemons = async (name) => {
  return await axios.get(
    `${process.env.REACT_APP_POKEMON_API}/ability/${name}`
  );
};

pokemonApi.getPokemonDetails = async (name) => {
  return await axios.get(
    `${process.env.REACT_APP_POKEMON_API}/pokemon/${name}`
  );
};

pokemonApi.getPokemonsPaged = async (offset, limit) => {
  return await axios.get(
    `${process.env.REACT_APP_POKEMON_API}/pokemon/?offset=${offset}&limit=${limit}`
  );
};

pokemonApi.getPokemonCount = async () => {
  return await axios.get(
    `${process.env.REACT_APP_POKEMON_API}/pokemon?offset=0&limit=10`
  );
};

pokemonApi.getPokemonAbilities = async (name) => {
  return await axios.get(
    `${process.env.REACT_APP_POKEMON_API}/ability?limit=300`
  );
};

export default pokemonApi;
