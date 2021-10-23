import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import spinner from "./spinner.gif";
import Pagination from "./Pagination";
import { buildPokemonCache, getPokemonFromLocalStorage } from "./PokemonCache";
import "./PokemonPage.style.css";
// import useFetch from "../../helpers/useFetch";
import pokemonsFetch from "../../helpers/pokemonsFetch";

function PokemonPage() {
  const [data, setData] = useState({});
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonsCount, setPokemonsCount] = useState(0);

  const storedPageUrl = localStorage.getItem("POKEMON_CURRENTURL");
  // console.log("Page: storedPageUrl", storedPageUrl);

  const [currentPageUrl, setCurrentPageUrl] = useState(
    storedPageUrl ||
      `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${limit}`
  );

  // setIsLoading(true)
  // const { error, isLoading, data } = useFetch(currentPageUrl);

  let cachedData = getPokemonFromLocalStorage();
  console.log("Page: cachedData", cachedData.length);

  useEffect(() => {
    (async () => {
      const storedLimit = localStorage.getItem("POKEMON_PAGINATION");
      if (storedLimit) setLimit(storedLimit);
      const res = await pokemonsFetch(currentPageUrl);
      console.log("Page data", res);
      setPokemonsCount(res.count);
      setData(res);

      //caching logic
      if (cachedData.length === res.count) {
        console.log("Page: found cached data");
        setPokemons(cachedData);
        } else {
          if (res.results) {
            setPokemons(res.results);
          }
          buildPokemonCache(res.count);
        }
      //end of caching logic
      
    })();
  }, [currentPageUrl]);



  const onItemsPerPageChange = async (amount) => {
    // console.log("Page: - amountPerPage", amount);
    setLimit(amount);
    setOffset(0);
    setCurrentPageUrl(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${amount}`
    );
    localStorage.setItem("POKEMON_PAGINATION", amount);
    localStorage.setItem(
      "POKEMON_CURRENTURL",
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${amount}`
    );
  };

  const onPrevNextPageChange = async (currentUrl) => {
    // console.log("Page: currentUrl", currentUrl);
    // console.log("Page: 1111111111");
    if (currentUrl) setCurrentPageUrl(currentUrl);
    localStorage.setItem("POKEMON_CURRENTURL", currentUrl);
    // console.log("Page: 2222222222", currentUrl);
    if (data) setPokemons(data.results);
    // console.log("Page: 3333333333", data.results);
    // console.log("Page: fetch changing to next url:", pokemons, currentUrl);
  };

  return (
    <>
      {console.log("Page:*", currentPageUrl, data)}

      {isLoading ? (
        <div className="spinner">
          <img src={spinner} alt="pokemon pic" />
        </div>
      ) : (
        data && (
          <>
            <div className="pokemons-page">
              <div className="buttons">
                <div className="">
                  <Pagination
                    gotoNextPage={data.next}
                    gotoPrevPage={data.previous}
                    onItemsPerPageChange={onItemsPerPageChange}
                    pokemonsPerPage={limit}
                    onPrevNextPageChange={onPrevNextPageChange}
                  />
                </div>
              </div>
              <PokemonList
                currentPageUrl={currentPageUrl}
                type={"pokemons"}
                pokemons={pokemons}
                count={pokemonsCount}
                offset={offset}
                limit={limit}
              />
            </div>
          </>
        )
      )}
    </>
  );
}

export default PokemonPage;
