import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import spinner from "../../assets/images/spinner.gif";
import Pagination from "../Navigation/Pagination.component";
import {
  buildPokemonCache,
  getPokemonFromLocalStorage,
} from "../../helpers/caching";
import "../../styles/Pokemon.style.css";
import pokemonsFetch from "../../helpers/pokemonsFetch";
import Search from "../Search/Search.component";
import Sort from "../Navigation/Sort.component";
import pokemonApi from "../../services/pokemonApi";

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
  const [search, setSearch] = useState(storedSearch || "");
  const [cachedSearchTerm, setCachedSearchTerm] = useState("");
  const [searchCleared, setSearchCleared] = useState(true);
  // const [filteredItems, setFilteredItems] = useState([]);
  const [searchOn, setSearchOn] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);
  const storedAbilitySelection = localStorage.getItem("POKEMON_ABILITY");
  const [abilitySelection, setAbilitySelection] = useState(
    storedAbilitySelection || ""
  );
  const [abilityItems, setAbilityItems] = useState([]);
  const [abilityReset, setAbilityReset] = useState(null);
  const [sortedItems, setSortedItems] = useState([]);
  const storedSortSelection = localStorage.getItem("POKEMON_SORT");
  const [sortSelection, setSortSelection] = useState(storedSortSelection || "");
  const [sortReset, setSortReset] = useState(null);
  let cachedData = getPokemonFromLocalStorage();
  const onCachedEnabled = () => {
    cachedData = getPokemonFromLocalStorage();
    storedSearch = localStorage.getItem("POKEMON_SEARCH");
    setCachedEnabled(true);
    if (storedSearch) {
      onSearch(storedSearch, "cached");
      setSearchOn(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    (async () => {
      setIsLoading(true);
      if (storedLimit) setLimit(parseInt(storedLimit));
      if (storedOffset) setOffset(parseInt(storedOffset));
      const res = await pokemonsFetch(currentPageUrl);
      if (offset === 0) res.previous = null;
      if (isMounted) setData(res);
      if (isMounted) setPokemonsCount(res.count);
      if (cachedData.length !== res.count) {
        if (res.results && isMounted) setPokemons(res.results);
      } else {
        if (search) {
          onSearch(search, "cached");
        } else {
          if (sortedItems.length > 0) {
            setPokemons(sortedItems.slice(offset, offset + limit));
          } else if (abilityItems.length > 0) {
            setPokemons(abilityItems);
          } else {
            if (isMounted) setPokemons(cachedData.slice(offset, offset + limit));
          }
        }
        if (isMounted) setCachedEnabled(true);
      }
      buildPokemonCache(res.count, onCachedEnabled);
      if (isMounted) setIsLoading(false);
    })();
    return () => { isMounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageUrl, searchCleared, sortedItems, abilityItems]);

  useEffect(
    () => {
      let isMounted = true;
      const sorts = {
        id: (a, b) => a.id - b.id,
        name: (a, b) => a.name.localeCompare(b.name),
        nameReverse: (a, b) => b.name.localeCompare(a.name),
        height: (a, b) => a.height - b.height,
        weight: (a, b) => a.weight - b.weight,
      };
      if (sortSelection && isMounted) {
        setAbilityReset("all");
        setNothingFound(false);
        setSortReset(null);
        setOffset(parseInt(storedOffset));
        setSortedItems(cachedData.sort(sorts[sortSelection]));
      }
      return () => {
        isMounted = false;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sortSelection]
  );

  useEffect(
    () => {
      let isMounted = true;
      (async () => {
        if (abilitySelection !== "all") {
          let foundPokemonsAbility = [];
          try {
            const response = await pokemonApi.getAbilityPokemons(
              abilitySelection
            );
            const abilityPokemons = response.data.pokemon;
            if (abilityPokemons) {
              for (let i = 0; i < abilityPokemons.length; i++) {
                let id = parseInt(
                  abilityPokemons[i].pokemon.url.split("/")[
                    abilityPokemons[i].pokemon.url.split("/").length - 2
                  ]
                );
                if (cachedData[id - 1])
                  foundPokemonsAbility.push(cachedData[id - 1]);
              }
            }
            if (isMounted) {
              if (foundPokemonsAbility.length === 0 && abilitySelection) {
                // alert("nothing found");
                // return <div>Nothing found</div>;
                setNothingFound(true);
              } else {
                setNothingFound(false);
                setSortedItems([]);
                setAbilityReset(null);
                setSortReset("id");
                setAbilityItems(foundPokemonsAbility);
                setOffset(0);
              }
            }
          } catch (err) {
            console.log(err);
          }
        } else if (isMounted) {
          setAbilityItems([]);
          setNothingFound(false);
        }
      })();
      return () => {
        isMounted = false;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [abilitySelection]
  );

  const onItemsPerPageChange = async (amount) => {
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
    if (currentUrl) setCurrentPageUrl(currentUrl);
    localStorage.setItem("POKEMON_CURRENTURL", currentUrl);
    localStorage.setItem("POKEMON_PAGINATION", limit);
    if (direction === "prev") {
      setOffset(offset - limit);
      localStorage.setItem("POKEMON_OFFSET", offset - limit);
    } else {
      setOffset(offset + limit);
      localStorage.setItem("POKEMON_OFFSET", offset + limit);
    }
  };

  const onSearch = async (value, cached) => {
    localStorage.getItem("POKEMON_SEARCH", value);
    if (!value) {
      localStorage.setItem("POKEMON_SEARCH", value);
      setNothingFound(false)
      setSearchCleared(true);
      setSearch("");
      setCachedSearchTerm(value);
    } else {
      localStorage.setItem("POKEMON_SEARCH", value);
      if (!cached && !cachedEnabled) {
        setSearchOn(true);
      } else {
        setSearch(value);
        let foundByName = await pokeFilter(value);
        if (foundByName.length === 0) {
          setNothingFound(true);
        } else {
          setPokemons(foundByName);
        }
        setSearchCleared(false);
      }
    }
  };

  const pokeFilter = async (value) => {
    return await cachedData.filter((pokemon) => {
      return pokemon.name.indexOf(value) !== -1;
    });
  };

  const onSort = (e) => {
    if (e === "id") {
      localStorage.removeItem("POKEMON_SORT");
    } else {
      localStorage.setItem("POKEMON_SORT", e);
    }
    setOffset(0);
    localStorage.setItem("POKEMON_OFFSET", 0);
    localStorage.setItem(
      "POKEMON_CURRENTURL",
      `https://pokeapi.co/api/v2/pokemon/?offset=${0}&limit=${limit}`
    );
    setSortedItems([]);
    setSortSelection(e);
  };

  const onAbilitySort = async (e) => {
    setSearchOn(false);
    if (e !== "all") {
      localStorage.setItem("POKEMON_ABILITY", e);
    } else {
      localStorage.removeItem("POKEMON_ABILITY");
      setAbilityItems([]);
    }
    setAbilitySelection(e);
  };

  return (
    <>
      {searchOn || isLoading ? (
        <div className="spinner">
          <img src={spinner} alt="pokemon pic" />
        </div>
      ) : (
        data && (
          <>
            <div className="pokemons-page">
              <div className="buttons">
                <div key={"pagination1"} className="">
                  <Pagination
                    gotoNextPage={data.next}
                    gotoPrevPage={data.previous}
                    onItemsPerPageChange={onItemsPerPageChange}
                    pokemonsPerPage={limit}
                    onPrevNextPageChange={onPrevNextPageChange}
                  />
                </div>
                <div className="">
                  <Sort
                    onSort={(e) => onSort(e.target.value)}
                    onAbilitySort={(e) => onAbilitySort(e.target.value)}
                    searchOn={searchOn}
                    cachedDataLength={cachedData.length}
                    sortSelection={sortSelection}
                    abilitySelection={abilitySelection}
                    sortReset={sortReset}
                    abilityReset={abilityReset}
                  />
                </div>
                {!cachedEnabled && (
                  <div id="cached-enabled">
                    <p>Caching...</p>
                    <img
                      className="spinner-small"
                      src={spinner}
                      alt="pokemon pic"
                    />
                  </div>
                )}
                <div key={"search1"} className="search">
                  <Search
                    onSearch={onSearch}
                    cachedSearchTerm={cachedSearchTerm}
                    search={search}
                  />
                </div>
              </div>
              {nothingFound ? (
                <div className="nothing-found">Nothing Found</div>
              ) : (
                <PokemonList
                  currentPageUrl={currentPageUrl}
                  type={"pokemons"}
                  pokemons={pokemons}
                  count={pokemonsCount}
                  offset={offset}
                  limit={limit}
                />
              )}
            </div>
            <div key={"pagination2"} className="pagination-bottom">
              <Pagination
                gotoNextPage={data.next}
                gotoPrevPage={data.previous}
                onItemsPerPageChange={onItemsPerPageChange}
                pokemonsPerPage={limit}
                onPrevNextPageChange={onPrevNextPageChange}
              />
            </div>
          </>
        )
      )}
    </>
  );
}

export default PokemonPage;
