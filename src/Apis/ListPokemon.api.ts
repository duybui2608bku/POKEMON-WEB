import { ListPokemon, PokemonConfig } from '../Types/Pokemon.type'
import axiosInstance from '../Utils/Axious'
const URL = 'pokemon'

const getListPokemon = (params: PokemonConfig) => {
  return axiosInstance.get<ListPokemon>(URL, {
    params
  })
}

// const getDetailPokemon = (name: string) => {
//   return axiosInstance.get<PokemonDetail>(`${URL}/${name}`)
// }

export default getListPokemon
