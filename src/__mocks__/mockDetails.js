const mockDetails = {
  data: {
    abilities: [
      {
        ability: {
          name: "shield-dust",
          url: "https://pokeapi.co/api/v2/ability/19/"
        },
        is_hidden: false,
        slot: 1
      },
      {
        ability: {
          name: "run-away",
          url: "https://pokeapi.co/api/v2/ability/50/"
        },
        is_hidden: true,
        slot: 3
      }
    ],
    base_experience: 39,
    forms: [
      {
        name: "caterpie",
        url: "https://pokeapi.co/api/v2/pokemon-form/10/"
      }
    ],
    game_indices: [
      {
        game_index: 123,
        version: {
          name: "red",
          url: "https://pokeapi.co/api/v2/version/1/"
        }
      },
      {
        game_index: 123,
        version: {
          name: "blue",
          url: "https://pokeapi.co/api/v2/version/2/"
        }
      },
      {
        game_index: 123,
        version: {
          name: "yellow",
          url: "https://pokeapi.co/api/v2/version/3/"
        }
      },
      {
        game_index: 10,
        version: {
          name: "gold",
          url: "https://pokeapi.co/api/v2/version/4/"
        }
      },
      {
        game_index: 10,
        version: {
          name: "silver",
          url: "https://pokeapi.co/api/v2/version/5/"
        }
      },
      {
        game_index: 10,
        version: {
          name: "crystal",
          url: "https://pokeapi.co/api/v2/version/6/"
        }
      },
      {
        game_index: 10,
        version: {
          name: "ruby",
          url: "https://pokeapi.co/api/v2/version/7/"
        }
      },
    ],
    height: 3,
    held_items: [],
    id: 10,
    is_default: true,
    location_area_encounters: "https://pokeapi.co/api/v2/pokemon/10/encounters",
    moves: [
      {
        move: {
          name: "tackle",
          url: "https://pokeapi.co/api/v2/move/33/"
        },
        version_group_details: [
          {
            level_learned_at: 1,
            move_learn_method: {
              name: "level-up",
              url: "https://pokeapi.co/api/v2/move-learn-method/1/"
            },
            version_group: {
              name: "red-blue",
              url: "https://pokeapi.co/api/v2/version-group/1/"
            }
          },
        ]
      },
      {
        move: {
          name: "electroweb",
          url: "https://pokeapi.co/api/v2/move/527/"
        },
        version_group_details: [
          {
            level_learned_at: 0,
            move_learn_method: {
              name: "tutor",
              url: "https://pokeapi.co/api/v2/move-learn-method/3/"
            },
            version_group: {
              name: "black-2-white-2",
              url: "https://pokeapi.co/api/v2/version-group/14/"
            }
          },
          {
            level_learned_at: 0,
            move_learn_method: {
              name: "tutor",
              url: "https://pokeapi.co/api/v2/move-learn-method/3/"
            },
            version_group: {
              name: "omega-ruby-alpha-sapphire",
              url: "https://pokeapi.co/api/v2/version-group/16/"
            }
          }
        ]
      }
    ],
    name: "caterpie",
    order: 14,
    past_types: [],
    species: {
      name: "caterpie",
      url: "https://pokeapi.co/api/v2/pokemon-species/10/"
    },
    sprites: {
      back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/10.png",
      back_female: null,
      back_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/10.png",
      back_shiny_female: null,
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
      front_female: null,
      front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10.png",
      front_shiny_female: null,
      other: {
        dream_world: {
          front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/10.svg",
          front_female: null
        },
        "official-artwork": {
          front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png"
        }
      },
      versions: {
        "generation-i": {
          "red-blue": {
            back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/back/10.png",
            back_gray: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/back/gray/10.png",
            front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/10.png",
            front_gray: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/gray/10.png"
          }
        }
      },
      stats: [
        {
          base_stat: 45,
          effort: 1,
          stat: {
            name: "hp",
            url: "https://pokeapi.co/api/v2/stat/1/"
          }
        }
      ],
      types: [
        {
          slot: 1,
          type: {
            name: "bug",
            url: "https://pokeapi.co/api/v2/type/7/"
          }
        }
      ],
      weight: 29
    }
  }
}

export default mockDetails