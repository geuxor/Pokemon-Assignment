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
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonsCount, setPokemonsCount] = useState(0);
  // const [storedOffset, setStoredOffset] = useState(null);
  const storedPageUrl = localStorage.getItem("POKEMON_CURRENTURL");
  const storedOffset = localStorage.getItem("POKEMON_OFFSET");
  const storedLimit = localStorage.getItem("POKEMON_PAGINATION");
  console.log("Page: storedPageUrl", storedPageUrl);
  
  const [limit, setLimit] = useState(parseInt(storedLimit) || 10);
  const [offset, setOffset] = useState(parseInt(storedOffset) || 0);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    storedPageUrl ||
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
  );

  // setIsLoading(true)
  // const { error, isLoading, data } = useFetch(currentPageUrl);

  let cachedData = getPokemonFromLocalStorage();
  console.log("Page: cachedData", cachedData.length);

  useEffect(() => {
    (async () => {
      console.log("Page: currentPageUrl changed -",currentPageUrl,offset,limit);

      const storedLimit = localStorage.getItem("POKEMON_PAGINATION");
      if (storedLimit) setLimit(parseInt(storedLimit));
      const res = await pokemonsFetch(currentPageUrl);
      console.log("Page data", res);
      setPokemonsCount(res.count);
      setData(res);

      //caching logic
      if (cachedData.length === res.count) {
        console.log("Page: found cached data foundOffset", offset);
        // setPokemons(cachedData);
        console.log(
          "Page: pokemons",
          offset, limit, cachedData.slice(offset, offset + limit)
        );
        
        setPokemons(cachedData.slice(offset, offset + limit));
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
    console.log("Page: - amountPerPage", amount);
    setLimit(amount);
    setOffset(0);
    localStorage.setItem("POKEMON_OFFSET", 0);
    setCurrentPageUrl(
      `https://pokeapi.co/api/v2/pokemon/?offset=${0}&limit=${amount}`
    );
    localStorage.setItem("POKEMON_PAGINATION", amount);
    localStorage.setItem(
      "POKEMON_CURRENTURL",
      `https://pokeapi.co/api/v2/pokemon/?offset=${0}&limit=${amount}`
    );
  };

  const onPrevNextPageChange = async (currentUrl, direction) => {
    console.log("Page: currentUrl 1", currentUrl);

    if (currentUrl) setCurrentPageUrl(currentUrl);
    localStorage.setItem("POKEMON_CURRENTURL", currentUrl);
    localStorage.setItem("POKEMON_OFFSET", offset+limit);
    console.log("Page: currentPageUrl 1 ", offset, limit);
    if (direction === "prev") {
      setOffset(offset - limit);
    } else {
      setOffset(offset + limit);
    }
    //maybe this can be removed
    // if (data) setPokemons(data.results);
  };

  return (
    <>
      {console.log("Page:*", currentPageUrl, data, offset, limit, pokemons.length)}

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
