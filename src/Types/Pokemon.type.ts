export interface PokemonConfig {
  limit?: string | number
  offset?: string | number
  id?: string | number
}

export interface ListPokemon {
  count: number
  next: string | null
  previous: string | null
  results: { name: string; url: string }[]
}

export interface DetailsPokemon {
  id: number
  name: string
  types: {
    slot: number
    type: {
      name: string
      url: string
    }
  }[]
}

export interface DetailPokemonSpecie {
  flavor_text_entries: [{ flavor_text: string }]
  evolution_chain: {
    url: string
  }
}

export interface DetaiPokemonEvo {
  id: number
  chain: {
    species: {
      name: string
      url: string
    }
    evolves_to?: [
      {
        species: {
          name: string
          url: string
        }
        evolves_to?: [
          {
            species: {
              name: string
              url: string
            }
          }
        ]
      }
    ]
  }
}
