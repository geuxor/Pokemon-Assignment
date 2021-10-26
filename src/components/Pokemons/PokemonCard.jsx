/* eslint-disable react/prefer-stateless-function */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button } from "antd";
import { Card } from "antd";
import "../../styles/Pokemon.style.css";
import spinner from "../../assets/images/spinner.gif";
import pokemonApi from "../../services/pokemonApi";

function PokemonCard({ pokemon, currentPageUrl, offset }) {
  const [loading, setLoading] = useState(true);
  const [pokemonDetails, setPokemonDetail] = useState({});

  const [abilities, setAbilities] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const [imageLoading, setImageLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const pokemonDetailData = {};
      let pokeData = [];

      try {
        if (pokemon.id) {
          pokeData = pokemon;

          pokemonDetailData.image = pokeData.image;
        } else {
          const response = await pokemonApi.getPokemonDetails(pokemon.name);

          pokeData = response.data;
          pokemonDetailData.image =
            pokeData.sprites.other["official-artwork"].front_default;
        }

        pokemonDetailData.id = pokeData.id;
        pokemonDetailData.name = pokeData.name;
        pokemonDetailData.height = pokeData.height;
        pokemonDetailData.weight = pokeData.weight;
        pokemonDetailData.abilities = pokeData.abilities;

        setAbilities(pokemonDetailData.abilities);

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
    history.push(`/pokemon/${pokemon.name}`, {
      currentPageUrl: currentPageUrl,
    });
  };

  return (
    <>
      <div className="card-wrapper">
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
                        return <li key={i}>{a.ability.name}</li>
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
