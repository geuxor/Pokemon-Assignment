import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import PokemonCard from "../components/Pokemons/PokemonCard";

const pokemon = {
  name: "blastoise",
  image:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
  height: 16,
  weight: 855,
  abilities: [
    {
      ability: {
        name: "torrent",
        url: "https://pokeapi.co/api/v2/ability/67/",
      },
      is_hidden: false,
      slot: 1,
    },
    {
      ability: {
        name: "rain-dish",
        url: "https://pokeapi.co/api/v2/ability/44/",
      },
      is_hidden: true,
      slot: 3,
    },
  ],
  url: "https://pokeapi.co/api/v2/pokemon/9",
  id: 9,
};

const mockedFunction = jest.fn();

describe("PokemonCard", () => {
  const history = createMemoryHistory();
  const MockPokemonCard = (
    <Router history={history}>
      <PokemonCard
        pokemon={pokemon}
        url={"https://pokeapi.co/api/v2/pokemon/9"}
        pokemonName={"blastoise"}
        onCached={mockedFunction}
        abilityId={1}
      />
    </Router>
  );

  it("should render a Title on a Pokemon Card", () => {
    render(MockPokemonCard);
    const titleElement = screen.getByTestId("pokemonCard-info");

    // expect(titleElement).toHaveTextContent("bulbasaur");
    // expect(titleElement).toBeTruthy();
    // expect(titleElement).not.toBeFalsy();
    // expect(titleElement.textContent).toBe("1 task left");
    // expect(titleElement).toContainHTML("p");
    // expect(titleElement).toBeVisible();
    expect(titleElement).toBeInTheDocument();
  });

    it("should render height on a Pokemon Card", () => {
      render(MockPokemonCard);
      const paragraphElement = screen.getByTestId("height");
      expect(paragraphElement).toHaveTextContent(/height:\s\d+/i);
    });

    it("should render weight on a Pokemon Card", () => {
      render(MockPokemonCard);
      const paragraphElement = screen.getByTestId("weight");
      expect(paragraphElement).toHaveTextContent(/weight:\s\d+/i);
    });

  it("should be able to show a Pokemon Picture", () => {
    render(MockPokemonCard);
    const imageElement = screen.getByAltText("pokePic");
    expect(imageElement.src).toContain(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png"
    );
  });

  it("should be redirecting to Details Page when clicking Details Button", () => {
    // const history = createMemoryHistory();
    render(MockPokemonCard);
    const buttonElement = screen.getByRole("button", { name: /Details/i });
    expect(buttonElement).toBeInTheDocument();
    act(() => {
      userEvent.click(buttonElement);
    });
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe("/pokemon/blastoise");
  });
});
