import { DetailPokemonSpecie } from '../Types/Pokemon.type'
import axiosInstance from '../Utils/Axious'
const URL = 'pokemon-species'
const getDetailPokemonSpecie = (name: string) => {
  return axiosInstance.get<DetailPokemonSpecie>(`${URL}/${name}`)
}

export default getDetailPokemonSpecie
