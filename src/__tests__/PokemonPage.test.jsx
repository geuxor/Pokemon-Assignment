import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import PokemonPage from "../components/Pokemons/PokemonPage";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";

// const mockPokemons = jest.mock("../__mocks__/mockPokemons")
// const mockDetails = jest.mock("../__mocks__/mockDetails");
// const mockResponse = jest.mock("../__mocks__/mockResponse");
// const mockLocalStorage = jest.mock("../__mocks__/localStorageMock");

//   componentWillUnmount() {
// // fix Warning: Can't perform a React state update on an unmounted component
// this.setData = (state,callback)=>{
//     return;
// };

const MockPokemonPage = () => {
  return (
    <BrowserRouter>
      <PokemonPage />
    </BrowserRouter>
  );
};

describe("Searching", () => {
  it("renders correctly", async () => {
    act(() => {
      render(<MockPokemonPage />);
    });
    const inputElement = await screen.findByTestId("search-input");
    expect(inputElement).toBeTruthy();
  });

  it("should render the search input field", async () => {
    act(() => {
      render(<MockPokemonPage />);
    });
    const buttonElement = await screen.findByRole("button", {
      name: "close-circle",
    });
    expect(buttonElement).toBeInTheDocument();
  });

  it("should update search input on change", async () => {
    act(() => {
      render(<MockPokemonPage />);
    });
    const inputElement = await screen.findByTestId("search-input");
    fireEvent.change(inputElement, { target: { value: "blast" } });
    expect(inputElement.value).toBe("blast");
  });

  it("should store search query in Local Storage", async () => {
    // try {
      await act( async () => {
        await render(<MockPokemonPage />);
      });
      const nextElement = await screen.findAllByRole("button", {name: /next/i});
      await act(async () => {
        await fireEvent.click(nextElement[0]);
      });
      const buttonElement = await screen.findAllByTestId("pokemonCard-info");
      expect(buttonElement.length).toBe(10);

  });
});
