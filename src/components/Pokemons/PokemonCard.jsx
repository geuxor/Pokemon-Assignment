/* eslint-disable react/prefer-stateless-function */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Modal, Button } from "antd";
import { Card } from "antd";
import "./PokemonCard.style.css";
import spinner from "./spinner.gif";
import pokemonApi from "../../services/pokemonApi";

function PokemonCard({ pokemon, currentPageUrl, offset }) {
  // console.log("Card: pokemon ----", pokemon, url, pokemonName, onCached, abilityId);
  const [loading, setLoading] = useState(true);
  const [pokemonDetails, setPokemonDetail] = useState({});
  // const [pokemonDetailIndex, setPokemonDetailIndex] = useState();
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [abilities, setAbilities] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  // const [, setPokemonIndex] = useState("");
  const [imageLoading, setImageLoading] = useState(true);
  const history = useHistory();
  // console.log("Card: abilityId", abilityId);

  useEffect(() => {
    (async () => {
      const pokemonDetailData = {};
      let pokeData = [];
      // console.log('oncached length', pokemon.id);
      // console.log("idFromUrl", pokemon.id);
      // if (!pokemon.id) {
      // const idFromUrl = url.split("/")[url.split("/").length - 1];
      // setPokemonDetailIndex(idFromUrl);
      // }
      try {
        if (pokemon.id) {
          pokeData = pokemon;
          // console.log("Card: Checking pokemon", pokeData);
          pokemonDetailData.image = pokeData.image;
          // pokemonDetailData.id = pokeData.id;
          // } else {
          // const pokemonFromLocalStorage = getPokemonFromLocalStorage();
          // if (pokemonFromLocalStorage.length === count) {
          //   console.log("Card: fetching data from Cache");
          //   // , pokemonFromLocalStorage.length);
          //   // console.log(
          //   //   "ID",
          //   //   url.split("/")[url.split("/").length - 2],
          //   //   pokemonFromLocalStorage[url.split("/")[url.split("/").length - 2]]
          //   // );
          //   pokeData =
          //     pokemonFromLocalStorage[
          //       url.split("/")[url.split("/").length - 2]
          //     ];
          //   console.log("Card pokemonDetailData:", pokemonDetailData.image);
          //   pokemonDetailData.image = pokeData.image;
        } else {
          const response = await pokemonApi.getPokemonDetails(pokemon.name);
          // console.log('getPokemonDetails', response);
          pokeData = response.data;
          pokemonDetailData.image =
            pokeData.sprites.other["official-artwork"].front_default;
          // const idFromUrl = url.split("/")[url.split("/").length - 1];
          // setPokemonDetailIndex(idFromUrl);
        }

        // }
        pokemonDetailData.id = pokeData.id;
        pokemonDetailData.name = pokeData.name;
        pokemonDetailData.height = pokeData.height;
        pokemonDetailData.weight = pokeData.weight;
        pokemonDetailData.abilities = pokeData.abilities;
        // console.log("Card: created ", pokemonDetailData);
        // console.log("------------", pokemonDetailData);
        // console.log("pokecacData", pokeCachedData);
        // onCached(pokemonDetailData);
        // setHeight(pokemonDetailData.height);
        // setWeight(pokemonDetailData.weight);
        // console.log("******* x ********", pokemonDetailData.abilities);
        setAbilities(pokemonDetailData.abilities);

        // setPokemonIndex(url.split("/")[url.split("/").length - 2]);
        pokemonDetailData.image
          ? setImageUrl(pokemonDetailData.image)
          : setImageUrl(
              "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
            );
        setPokemonDetail(pokemonDetailData);
        setImageLoading(false);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setImageLoading(false);
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon]);

  const showDetails = () => {
    // history.push(`/pokemon/${pokemon.name}`);
    // history.push({
    //   pathname: `/pokemon/${pokemon.name}`,
    //   state: { detail: "response" },
    // });
    history.push(`/pokemon/${pokemon.name}`, {
      currentPageUrl: currentPageUrl
    });
  };

  return (
    <>
      <div className="site-card-border-less-wrapper">
        {loading ? (
          <div className="spinner">
            <img src={spinner} alt="pokemon pic" />
          </div>
        ) : (
          <>
            <Card
              data-testid="pokemonCard-info"
              title={`${pokemonDetails.name.toUpperCase()}`}
              bordered={false}
              style={{ width: 300 }}
            >
              {imageLoading ? (
                <img src={spinner} alt="pokemon pic" />
              ) : (
                <>
                  <img
                    onLoad={() => setImageLoading(false)}
                    src={imageUrl}
                    alt="pokePic"
                    className="pokemon-image"
                  />
                  <div className="card-content">
                    <div className="poke-id">ID{pokemonDetails.id}</div>
                    <p data-testid="height">Height: {pokemonDetails.height}</p>
                    <p data-testid="weight">Weight: {pokemonDetails.weight}</p>
                    <div>
                      <b>
                        <u>Abilities</u>
                      </b>
                    </div>

                    <ul className="types-list" style={{ listStyle: "none" }}>
                      {abilities.map((a, i) => {
                        return <li key={i.toString()}>{a.ability.name}</li>;
                      })}
                    </ul>
                  </div>
                  <Button
                    type="primary"
                    onClick={showDetails}
                    style={{ marginTop: "1em" }}
                  >
                    Details
                  </Button>
                </>
              )}
            </Card>
          </>
        )}
      </div>
    </>
  );
}

export default PokemonCard;
