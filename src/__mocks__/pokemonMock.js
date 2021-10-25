const pokemon = {
  name: "blastoise",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
      height: 16,
        weight: 855,
          abilities: [
            {
              ability: {
                name: "torrent",
                url: "https://pokeapi.co/api/v2/ability/67/"
              },
              is_hidden: false,
              slot: 1
            },
            {
              ability: {
                name: "rain-dish",
                url: "https://pokeapi.co/api/v2/ability/44/"
              },
              is_hidden: true,
              slot: 3
            }
          ],
            url: "https://pokeapi.co/api/v2/pokemon/9",
              id: 9
}



// eslint-disable-next-line import/no-anonymous-default-export
export default pokemon

// {
//   get: jest.fn().mockResolvedValue(pokemonMock)
// }
