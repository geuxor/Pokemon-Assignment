import React, { useEffect } from "react";
import "./PokemonList.style.css";
import { Layout } from "antd";
import PokemonCard from "./PokemonCard";
const { Content } = Layout;

function PokemonList({ type, pokemons, count, offset, limit, currentPageUrl }) {
  console.log("List: pokemons data", pokemons);

  return (
    <div>
      {pokemons && (
        <>
          <Content style={{ padding: "0 50px" }}>
            <div className="site-layout-content">
              {console.log("List: ", pokemons)}
              <>
                {pokemons.map((p, i) => {
                  return (
                    <>
                      <br />
                      <PokemonCard
                        key={i}
                        pokemon={p}
                        currentPageUrl={currentPageUrl}
                        offset={offset}
                      />
                      ;
                    </>
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


