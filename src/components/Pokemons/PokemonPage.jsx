import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import spinner from "./spinner.gif";
import Pagination from "./Pagination";
import { buildPokemonCache, getPokemonFromLocalStorage } from "./PokemonCache";
import "./PokemonPage.style.css";
import pokemonsFetch from "../../helpers/pokemonsFetch";
import Search from "../Search/Search.component";

function PokemonPage() {
  const [data, setData] = useState({});
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsCount, setPokemonsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [cachedEnabled, setCachedEnabled] = useState(false);
  const storedLimit = localStorage.getItem("POKEMON_PAGINATION");
  const [limit, setLimit] = useState(parseInt(storedLimit) || 10);
  const storedOffset = localStorage.getItem("POKEMON_OFFSET");
  const [offset, setOffset] = useState(parseInt(storedOffset) || 0);
  const storedPageUrl = localStorage.getItem("POKEMON_CURRENTURL");
  const [currentPageUrl, setCurrentPageUrl] = useState(
    storedPageUrl ||
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
  );
  let storedSearch = localStorage.getItem("POKEMON_SEARCH");
  console.log("storedSearch", storedSearch);

  const [search, setSearch] = useState(storedSearch || "");
  const [cachedSearchTerm, setCachedSearchTerm] = useState("");
  const [searchCleared, setSearchCleared] = useState(true);
  const [filteredItems, setFilteredItems] = useState([]);
  const [abilityPokemons, setAbilityPokemons] = useState([]);
  const [searchOn, setSearchOn] = useState(false);
  // setIsLoading(true)
  // const { error, isLoading, data } = useFetch(currentPageUrl);

  let cachedData = getPokemonFromLocalStorage();
  // console.log("Page: cachedData", cachedData.length);

  const onCachedEnabled = () => {
    cachedData = getPokemonFromLocalStorage();
    storedSearch = localStorage.getItem("POKEMON_SEARCH");
    console.log("enabling cache from cache", storedSearch, search);
    setCachedEnabled(true);
    onSearch(storedSearch, "cached");
    setSearchOn(false);
  };

  useEffect(() => {
    (async () => {
      // setIsLoading(true);
      console.log(
        "Page: currentPageUrl currentPageUrl offset changed -",
        currentPageUrl,
        offset,
        limit
      );
      console.log("Page searchcleared", searchCleared);

      // const storedLimit = localStorage.getItem("POKEMON_PAGINATION");
      if (storedLimit) setLimit(parseInt(storedLimit));
      console.log("storedOffset", storedOffset);
      if (storedOffset) setOffset(parseInt(storedOffset));

      const res = await pokemonsFetch(currentPageUrl);
      // console.log("Page data", res);
      setPokemonsCount(res.count);
      setData(res);

      //caching logic
      if (cachedData.length === res.count) {
        console.log("Page: found cached data foundOffset", offset);
        // console.log("Page: pokemons",offset,limit,cachedData.slice(offset, offset + limit));
        if (search) {
          console.log("onSearch", storedSearch, search);
          onSearch(search, "cached")
        } else {
          if (searchCleared) setPokemons(cachedData.slice(offset, offset + limit));
        }
        setCachedEnabled(true);
      } else {
        if (res.results) {
          setPokemons(res.results);
        }
        buildPokemonCache(res.count, onCachedEnabled);
      }
      //end of caching logic
      // setIsLoading(false);
    })();
    return () => {
      console.log("when the fuck did this unmount?");
    };
  }, [currentPageUrl, searchCleared]);

  const onItemsPerPageChange = async (amount) => {
    console.log("Page: - amountPerPage", amount);
    setLimit(amount);
    setOffset(0);
    console.log("Page: resetting offset", offset);

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
    // console.log("Page: currentUrl 1", currentUrl);
    if (currentUrl) setCurrentPageUrl(currentUrl);
    localStorage.setItem("POKEMON_CURRENTURL", currentUrl);
    
    console.log("Page: localStorage offset ", offset, limit);
    if (direction === "prev") {
      setOffset(offset - limit);
      localStorage.setItem("POKEMON_OFFSET", offset - limit);
      console.log("PAge Prev offset", offset);
    } else {
      setOffset(offset + limit);
      localStorage.setItem("POKEMON_OFFSET", offset + limit);
      console.log("PAge Next offset", offset);
    }
  };

  const onSearch = async (value, cached) => {
    // setIsLoading(true);
    console.log("Page: onSearch ", value.length, 'cache', cached);
    localStorage.getItem("POKEMON_SEARCH", value);
    if (!value) {
      console.log("onSearch no value");
      localStorage.setItem("POKEMON_SEARCH", value);
      setSearchCleared(true);
      setSearch("");
      setFilteredItems("");
      setCachedSearchTerm(value);
      // return null;
    } else {
      localStorage.setItem("POKEMON_SEARCH", value);
      console.log("cached enabled - Loading?", cached, cachedEnabled);

      if (!cached && !cachedEnabled) {
        console.log("cached NOT enabled");
        setSearchOn(true);
      } else {
        // setAbilityPokemons([]);
        setSearch(value);
        let foundByName = await pokeFilter(value);
        console.log("Page Search foundbyname ", foundByName);
        // await setFilteredItems(foundByName);
        setPokemons(foundByName);
        // setCachedSearchTerm(value);
        setSearchCleared(false);
        // setIsLoading(false);
      }
    }
  };

  const pokeFilter = async (value) => {
    console.log("Search pokefilter", value, cachedData);

    return await cachedData.filter((pokemon) => {
      return pokemon.name.indexOf(value) !== -1;
    });
  };
  return (
    <>
      {console.log(
        "Page:*",
        currentPageUrl,
        data,
        offset,
        limit,
        pokemons.length,
        "\nfilteredItems",
        filteredItems
      )}

      {searchOn ? (
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
                <div className="search">
                  <Search
                    onSearch={onSearch}
                    cachedSearchTerm={cachedSearchTerm}
                    search={search}
                  />
                </div>
              </div>
              <PokemonList
                isLoading={isLoading}
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
