import { DetailsPokemon } from '../Types/Pokemon.type'
import axiosInstance from '../Utils/Axious'
const URL = 'pokemon'
const getDetailPokemon = (name: string) => {
  return axiosInstance.get<DetailsPokemon>(`${URL}/${name}`)
}

export default getDetailPokemon
