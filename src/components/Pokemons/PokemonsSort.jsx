import React, { Fragment, useEffect, useState } from "react";
import pokemonApi from "../../services/pokemonApi";

function PokemonsSort({
  onAbilitySort,
  onSort,
  searchOn,
  cachedDataLength,
  sortSelection,
}) {
  const [abilities, setAbilities] = useState([{ name: "all" }]);
  const [storedAbility, setStoredAbility] = useState([]);
  console.log("Pokemon Sort sortSelection", sortSelection);
  
  useEffect(() => {
    (async () => {
      try {
        const response = await pokemonApi.getPokemonAbilities();
        response.data.results.unshift({ name: "all" });
        setAbilities(response.data.results);
        const ability = { target: { value: "" } };
        ability.target.value = localStorage.getItem("PokemonAbilitySort");
        setStoredAbility(ability.target.value);
        if (ability.target.value) {
          // console.log(ability, " found on localstorage");
          onAbilitySort(ability);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="ui search">
      Sort by:
      <select
        disabled={cachedDataLength < 1118 && true}
        onChange={onSort}
        value={sortSelection}
      >
        <option key="1" value="id">
          {" "}
          -{" "}
        </option>
        <option key="2" value="name">
          name
        </option>
        <option key="3" value="nameReverse">
          nameReverse
        </option>
        <option key="4" value="height">
          height
        </option>
        <option key="5" value="weight">
          weight
        </option>
      </select>{" "}
      {console.log("abilities--", cachedDataLength)}
      Abilities:
      <select
        disabled={cachedDataLength < 1118 && true}
        onChange={onAbilitySort}
      >
        {abilities.map((a, i) => {
          if (!searchOn) {
            if (a.name === storedAbility) {
              return (
                <Fragment key={i}>
                  <option selected value={a.name}>
                    {a.name}
                  </option>
                </Fragment>
              );
            } else {
              return (
                <Fragment key={i}>
                  <option value={a.name}>{a.name}</option>
                </Fragment>
              );
            }
          } else {
            if (a.name === "all") {
              return (
                <Fragment key={i}>
                  <option selected value={a.name}>
                    {a.name}
                  </option>
                </Fragment>
              );
            } else {
              return (
                <Fragment key={i}>
                  <option value={a.name}>{a.name}</option>
                </Fragment>
              );
            }
          }
        })}
      </select>
    </div>
  );
}

export default PokemonsSort;
