const mockPokemons =
  [
    {
      name: "bulbasaur",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      height: 7,
      weight: 69,
      abilities: [
        {
          ability: {
            name: "overgrow",
            url: "https://pokeapi.co/api/v2/ability/65/"
          },
          is_hidden: false,
          slot: 1
        },
        {
          ability: {
            name: "chlorophyll",
            url: "https://pokeapi.co/api/v2/ability/34/"
          },
          is_hidden: true,
          slot: 3
        }
      ],
      url: "https://pokeapi.co/api/v2/pokemon/1",
      id: 1
    },
    {
      name: "ivysaur",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
      height: 10,
      weight: 130,
      abilities: [
        {
          ability: {
            name: "overgrow",
            url: "https://pokeapi.co/api/v2/ability/65/"
          },
          is_hidden: false,
          slot: 1
        },
        {
          ability: {
            name: "chlorophyll",
            url: "https://pokeapi.co/api/v2/ability/34/"
          },
          is_hidden: true,
          slot: 3
        }
      ],
      url: "https://pokeapi.co/api/v2/pokemon/2",
      id: 2
    },
    {
      name: "venusaur",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
      height: 20,
      weight: 1000,
      abilities: [
        {
          ability: {
            name: "overgrow",
            url: "https://pokeapi.co/api/v2/ability/65/"
          },
          is_hidden: false,
          slot: 1
        },
        {
          ability: {
            name: "chlorophyll",
            url: "https://pokeapi.co/api/v2/ability/34/"
          },
          is_hidden: true,
          slot: 3
        }
      ],
      url: "https://pokeapi.co/api/v2/pokemon/3",
      id: 3
    },
    {
      name: "charmander",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
      height: 6,
      weight: 85,
      abilities: [
        {
          ability: {
            name: "blaze",
            url: "https://pokeapi.co/api/v2/ability/66/"
          },
          is_hidden: false,
          slot: 1
        },
        {
          ability: {
            name: "solar-power",
            url: "https://pokeapi.co/api/v2/ability/94/"
          },
          is_hidden: true,
          slot: 3
        }
      ],
      url: "https://pokeapi.co/api/v2/pokemon/4",
      id: 4
    }
  ]

export default mockPokemons

// {
//   getPokemonCount: jest.fn().mockResolvedValue(mockResponse),
//   getPokemonDetails: jest.fn().mockResolvedValue(mockDetails)
// }