import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import PokemonPage from "../components/Pokemons1/PokemonPage";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";

// const mockPokemons = jest.mock("../__mocks__/mockPokemons")
// const mockDetails = jest.mock("../__mocks__/mockDetails");
// const mockResponse = jest.mock("../__mocks__/mockResponse");

const MockPokemonPage = () => {
  return (
    <BrowserRouter>
      <PokemonPage />
    </BrowserRouter>
  );
};

describe("Searching", () => {
  it("renders correctly", async () => {
    render(<MockPokemonPage />);
    const inputElement = await screen.findByTestId("search-input");
    expect(inputElement).toBeTruthy();
  });

  it("should render the search input field", async () => {
    render(<MockPokemonPage />);
    const buttonElement = await screen.findByRole("button", {
      name: "close-circle",
    });
    expect(buttonElement).toBeInTheDocument();
  });

  it("should update search input on change", async () => {
    render(<MockPokemonPage />);
    const inputElement = await screen.findByTestId("search-input");
    fireEvent.change(inputElement, { target: { value: "blast" } });
    expect(inputElement.value).toBe("blast")
  });

  it("should store search query in Local Storage", async () => {

    render(<MockPokemonPage />);
    const inputElement = await screen.findByTestId("search-input");
    fireEvent.change(inputElement, { target: { value: "blast" } });
    const buttonElement = await screen.findByRole("button", {
      name: "search...",
    });
    // fireEvent.keyDown(buttonElement, {key: 'Enter', code: 'Enter', charCode: 13})
    fireEvent.click(buttonElement);

    const storedSearch = window.localStorage.getItem("POKEMON_SEARCH");
    expect(storedSearch).toBeTruthy();

    // jest.spyOn(window.localStorage.__proto__, "setItem");
    // window.localStorage.__proto__.setItem = jest.fn();
    // expect(localStorage.setItem).toHaveBeenCalled();
    // expect(window.localStorage.setItem).toHaveValue("POKEMON")

    // await act(async () => {
    //   fireEvent.click(buttonElement);
    // })
    // screen.debug();

    // const onCached = jest.fn();
    // render(
    //   <PokemonList
    //     pokemons={mockPokemons}
    //     onCached={onCached}
    //     pokemonCached={mockDetails}
    //     count={10}
    //     offset={0}
    //     limit={10}
    //     abilityPokemons={mockDetails}
    //   />
    // );
    // expect(mockPokemons.length).toBe(4);
    // const titleElement = await screen.findAllByTestId("pokemonCard-info");
    // expect(titleElement.length).toBe(4);

    // expect(setSearch).not.toHaveBeenCalled();
    // const titleElement = await screen.findAllByTestId("pokemonCard-info");
    //   expect(titleElement.length).toBe(1)
    //   // console.log(buttonElement);
    // expect(buttonElement.getElementsByClassName("ant-btn ant-btn-primary ant-input-search-button")).toHaveTextContent(/search/i)
  });

 
});
