import React from "react";
import "../../styles/Pokemon.style.css";
import { Layout } from "antd";
import PokemonCard from "./PokemonCard";
const { Content } = Layout;

function PokemonList({ pokemons, offset, currentPageUrl }) {
  return (
    <div>
      {pokemons && (
        <>
          <Content style={{ padding: "0 50px" }}>
            <div className="site-layout-content">
              <>
                {pokemons.map((p, i) => {
                  return (
                    <PokemonCard
                      key={i}
                      pokemon={p}
                      currentPageUrl={currentPageUrl}
                      offset={offset}
                    />
                  );
                })}
              </>
            </div>
          </Content>
        </>
      )}
    </div>
  );
}

export default PokemonList;
