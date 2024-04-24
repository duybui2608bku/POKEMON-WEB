export interface PokemonConfig {
  limit?: string | number
  offset?: string | number
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
