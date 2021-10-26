import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import "../../styles/Pokemon.style.css";
import spinner from "../../assets/images/spinner.gif";
import pokemonApi from "../../services/pokemonApi";
import { useLocation } from "react-router-dom";

function PokemonDetails() {
  const [loading, setLoading] = useState(true);
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [flipped, setFlipped] = useState({});
  const { name } = useParams();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const response = await pokemonApi.getPokemonDetails(name);
        setPokemonDetails(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = () => {
    history.replace("/", {
      currentPageUrl: location.state.currentPageUrl,
    });
  };

  return (
    <>
      <div className="card-wrapper">
        <button className="button icon-left" onClick={goBack}>
          Back
        </button>
        {loading ? (
          <div className="spinner">
            <img src={spinner} alt="pokemon pic" />
          </div>
        ) : (
          <>
            <div className="detail-content">
              <div className="detail-heading">
                <div
                  onMouseEnter={() => setFlipped(!flipped)}
                  onMouseLeave={() => setFlipped(!flipped)}
                >
                  <div>
                    <img
                      alt="flipping"
                      className="pokemon_pic"
                      src={
                        flipped
                          ? pokemonDetails.sprites.other.dream_world
                              .front_default
                          : pokemonDetails.sprites.back_default
                      }
                    />
                  </div>
                </div>
                <div className="title">{pokemonDetails.name.toUpperCase()}</div>
                <div className="poke-id">ID {pokemonDetails.id}</div>
                <div className="attributes">
                  <p>Height:{pokemonDetails.height}</p>
                  <p>Base Experience:{pokemonDetails.base_experience}</p>
                  <p>Weight:{pokemonDetails.weight}</p>
                </div>
              </div>
              <div className="lists">
                {pokemonDetails.abilities && (
                  <div className="list-info">
                    <b>
                      <u>Abilities</u>
                    </b>

                    <ul className="list-items" style={{ listStyle: "none" }}>
                      {pokemonDetails.abilities.map((a, i) => {
                        return <li key={i}>{a.ability.name}</li>;
                      })}
                    </ul>
                  </div>
                )}
                {pokemonDetails.moves && (
                  <div className="list-info">
                    <b>
                      <u>Moves</u>
                    </b>

                    <ul className="list-items" style={{ listStyle: "none" }}>
                      {pokemonDetails.moves.map((m, i) => {
                        return <li key={i}>{m.move.name}</li>;
                      })}
                    </ul>
                  </div>
                )}
                {pokemonDetails.types && (
                  <div className="list-info">
                    <b>
                      <u>Types</u>
                    </b>

                    <ul className="list-items" style={{ listStyle: "none" }}>
                      {pokemonDetails.types.map((m, i) => {
                        return <li key={i}>{m.type.name}</li>;
                      })}
                    </ul>
                  </div>
                )}
                {pokemonDetails.heldItems && (
                  <div className="list-info">
                    <b>
                      <u>Held Items</u>
                    </b>

                    <ul className="list-items" style={{ listStyle: "none" }}>
                      {pokemonDetails.heldItems.map((m, i) => {
                        return <li key={i}>{m}</li>;
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default PokemonDetails;
