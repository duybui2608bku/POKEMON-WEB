import { DetaiPokemonEvo } from '../Types/Pokemon.type'
import axiosInstance from '../Utils/Axious'
const URL = 'evolution-chain'
const getPokemonEvalution = (id: string) => {
  return axiosInstance.get<DetaiPokemonEvo>(`${URL}/${id}`)
}

export default getPokemonEvalution
