import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import spinner from "./spinner.gif";
import Pagination from "./Pagination";
import { buildPokemonCache, getPokemonFromLocalStorage } from "./PokemonCache";
import "./PokemonPage.style.css";
import pokemonsFetch from "../../helpers/pokemonsFetch";
import Search from "../Search/Search.component";
import PokemonsSort from "./PokemonsSort";
import pokemonApi from "../../services/pokemonApi";

function PokemonPage() {
  console.log("Page -----------------------------");

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
  const [searchOn, setSearchOn] = useState(false);

  const storedAbilitySelection = localStorage.getItem("POKEMON_ABILITY");
  const [abilitySelection, setAbilitySelection] = useState(
    storedAbilitySelection || ""
  );
  const [abilityItems, setAbilityItems] = useState([]);

  const [sortedItems, setSortedItems] = useState([]);
  const storedSortSelection = localStorage.getItem("POKEMON_SORT");
  const [sortSelection, setSortSelection] = useState(storedSortSelection || "");

  const [abilityReset, setAbilityReset] = useState(null);
  const [sortReset, setSortReset] = useState(null);

  let cachedData = getPokemonFromLocalStorage();
  console.log("Page cachedData", cachedData.length);

  const onCachedEnabled = () => {
    cachedData = getPokemonFromLocalStorage();
    storedSearch = localStorage.getItem("POKEMON_SEARCH");
    console.log("enabling cache from cache", storedSearch, search);
    setCachedEnabled(true);
    if (storedSearch) {
      onSearch(storedSearch, "cached");
      setSearchOn(false);
    }
  };

  useEffect(() => {
    (async () => {
      console.log("Page setting loading ***************************");
      setIsLoading(true);
      console.log(
        "Page: currentPageUrl currentPageUrl offset changed -",
        currentPageUrl,
        offset,
        limit
      );
      console.log("Page searchcleared", searchCleared);
      console.log("Page setting limit ***************************");
      if (storedLimit) setLimit(parseInt(storedLimit));
      console.log("storedOffset", storedOffset);
      console.log("Page setting offset ***************************");
      if (storedOffset) setOffset(parseInt(storedOffset));
      const res = await pokemonsFetch(currentPageUrl);
      console.log("Page: did I found cached??", cachedData.length);
      console.log("Page setting data ***************************");
      console.log("Page, sortSelection", sortSelection, offset);
      if (offset === 0) res.previous = null;
      setData(res);
      console.log("Page setting pokemons ***************************");
      setPokemonsCount(res.count);
      if (cachedData.length !== res.count) {
        ///??? here !!!  when is the cache being build???
        console.log("Page: NOT found cached", res);
        console.log("Page setting Pokemons ***************************");
        if (res.results) setPokemons(res.results);
      } else {
        console.log("Page: YES found cached data foundOffset", offset);
        // console.log("Page: pokemons",offset,limit,cachedData.slice(offset, offset + limit));
        if (search) {
          console.log("onSearch", storedSearch, search);
          onSearch(search, "cached");
        } else {
          console.log("searchcleared", searchCleared);
          console.log("Page offset limit ", offset, limit);
          if (searchCleared) console.log("Page setting Pokemons *********");
          console.log("Page cachedData sortedItems", sortedItems);
          console.log("Page ability Pokemons", abilityItems);

          console.log(
            "Page offset, offset + limit",
            typeof offset,
            typeof limit
          );

          if (sortedItems.length > 0) {
            console.log("Page setting pokemons to sortedItems");
            setPokemons(sortedItems.slice(offset, offset + limit));
          } else if (abilityItems.length > 0) {
            console.log("Page setting pokemons to ability items");
            setPokemons(abilityItems);
          } else {
            console.log("Page setting pokemons to cachedData");
            setPokemons(cachedData.slice(offset, offset + limit));
          }
        }
        console.log("Page setting CachedEnabled ***************************");
        setCachedEnabled(true);
      }
      buildPokemonCache(res.count, onCachedEnabled);
      //end of caching logic
      console.log("Page setting IsLoading ***************************");

      setIsLoading(false);
    })();
    return () => {
      console.log("when the did this unmount?");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageUrl, searchCleared, sortedItems, abilityItems]);

  useEffect(
    () => {
      console.log("offset sorts", offset, storedOffset);
      const sorts = {
        id: (a, b) => a.id - b.id,
        name: (a, b) => a.name.localeCompare(b.name),
        nameReverse: (a, b) => b.name.localeCompare(a.name),
        height: (a, b) => a.height - b.height,
        weight: (a, b) => a.weight - b.weight,
      };
      if (sortSelection) {
        // setAbilitySelection("all")
        // localStorage.removeItem("POKEMON_ABILITY");
        // setAbilityItems([])
        setAbilityReset("all");
        setSortReset(null);
        setOffset(parseInt(storedOffset));
        setSortedItems(cachedData.sort(sorts[sortSelection]));
        console.log("cached Data has been sorted??", cachedData[0]);
        
      } else {
        console.log("Page sortSelection offset **");
      }
      console.log("sortSelection", typeof storedOffset);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sortSelection]
  );

  useEffect(
    () => {
      (async () => {
        if (abilitySelection !== "all") {
          console.log("get Ability Pokes name", abilitySelection);

          let foundPokemonsAbility = [];
          try {
            const response = await pokemonApi.getAbilityPokemons(
              abilitySelection
            );
            console.log("Ability response", response.data.pokemon);

            const abilityPokemons = response.data.pokemon;
            for (let i = 0; i < abilityPokemons.length; i++) {
              console.log(
                "xxx ability",
                abilityPokemons[i].pokemon.url,
                abilityPokemons[i].pokemon.url.split("/")[
                  abilityPokemons[i].pokemon.url.split("/").length - 2
                ]
              );
              
              let id = parseInt(
                abilityPokemons[i].pokemon.url.split("/")[
                  abilityPokemons[i].pokemon.url.split("/").length - 2
                ]
              );
              console.log(
                "ability id",
                id,
                cachedData[id - 1],
                cachedData
              );

              if (cachedData[id - 1])
                foundPokemonsAbility.push(cachedData[id - 1]);
            }
            console.log("foundPokemonsAbility", foundPokemonsAbility);
            
            if (foundPokemonsAbility.length === 0) {
              alert("nothing found");
            } else {
              // setSortedItems(foundPokemonsAbility);
              
              setSortedItems([]);
              // setSortSelection("-")
              // localStorage.removeItem("POKEMON_SORT");
              setAbilityReset(null);
              setSortReset("id");
              setAbilityItems(foundPokemonsAbility);
              // setPokemons(foundPokemonsAbility);
              setOffset(0);
              console.log("Ability foundPokemonsAbility", foundPokemonsAbility);
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          setAbilityItems([]);
        }
      })();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [abilitySelection]
  );

  const onItemsPerPageChange = async (amount) => {
    console.log("offset onItemsPerPageChange", offset);
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
    console.log("offset onItemsPerPageChange", offset);
  };

  const onPrevNextPageChange = async (currentUrl, direction) => {
    console.log("offset onPrevNextPageChange", offset);
    // console.log("Page: currentUrl 1", currentUrl);
    if (currentUrl) setCurrentPageUrl(currentUrl);
    localStorage.setItem("POKEMON_CURRENTURL", currentUrl);
    localStorage.setItem("POKEMON_PAGINATION", limit);
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
    console.log("offset onPrevNextPageChange", offset);
  };

  const onSearch = async (value, cached) => {
    console.log("offset onSearch", offset);
    if (value) console.log("Page: onSearch ", value.length, "cache", cached);
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
        setPokemons(foundByName);
        setSearchCleared(false);
      }
    }
    console.log("offset onSearch", offset);
  };

  const pokeFilter = async (value) => {
    console.log("Search pokefilter", value, cachedData);
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
    // data.previous = null
    // console.log("resetting data.previous");
    // setData(data);

    setSortedItems([]);
    setSortSelection(e);
  };

  const onAbilitySort = async (e) => {
    console.log("on Ability Sort", e);
    setSearchOn(false);
    if (e !== "all") {
      localStorage.setItem("POKEMON_ABILITY", e);
      
      // getAbilityPokes(e);
    } else {
      localStorage.removeItem("POKEMON_ABILITY");
      setAbilityItems([]);
    }
    setAbilitySelection(e);
  };

  const getAbilityPokes = async (name) => {
    console.log("get Ability Pokes name", name);

    let foundPokemonsAbility = [];
    try {
      const response = await pokemonApi.getAbilityPokemons(name);
      console.log("Ability response", response.data.pokemon);

      const abilityPokemons = response.data.pokemon;
      for (let i = 0; i < abilityPokemons.length; i++) {
        let id = parseInt(
          abilityPokemons[i].pokemon.url.split("/")[
            abilityPokemons[i].pokemon.url.split("/").length - 2
          ]
        );
        // console.log("ability id", id, cachedData[id - 1]);

        if (cachedData[id - 1]) foundPokemonsAbility.push(cachedData[id - 1]);
      }
      // setSortedItems(foundPokemonsAbility);
      // setAbilityPokemons(foundPokemonsAbility)
      // setPokemons(foundPokemonsAbility);
      setOffset(0);
      console.log("offset get Ability Pokes", offset);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {console.log(
        "Page:*",
        currentPageUrl,
        data,
        "\noffset",
        offset,
        "\nstored offset",
        storedOffset,
        "\nlimit",
        limit,
        "\npokes length",
        pokemons.length,
        "\nfilteredItems",
        filteredItems,
        "\ncachedData",
        cachedData[0]
      )}
      {console.log("\ndata.previous", data.previous, "\ndata.next", data.next)}
      {console.log("\nSet sorted Items", sortedItems)}

      {searchOn || isLoading ? (
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
                <div className="">
                  <PokemonsSort
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
                <div className="search">
                  <Search
                    onSearch={onSearch}
                    cachedSearchTerm={cachedSearchTerm}
                    search={search}
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
            <div className="pagination">
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
