import { PokemonConfig } from '../Types/Pokemon.type'
import useQueryParams from './useQueryParams'

export type QueryConfig = {
  [key in keyof PokemonConfig]: string
}

const useQueryConfig = () => {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = {
    limit: queryParams.limit || '8',
    offset: queryParams.offset || '0'
  }
  return queryConfig
}

export default useQueryConfig
