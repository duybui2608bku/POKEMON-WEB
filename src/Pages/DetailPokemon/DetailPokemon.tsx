import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import getDetailPokemon from '../../Apis/PokemonDetail'
import './DetailPokemon.scss'
const DetailPokemon = () => {
  const idPokemon = useParams()
  const id = idPokemon.id as string

  const { data } = useQuery({
    queryKey: ['detailPokemon', idPokemon],
    queryFn: () => {
      return getDetailPokemon(id)
    }
  })
  console.log(data)

  return (
    <>
      <div className='detail-pokemon-container'>
        <div className='left'></div>
        <div className='right'>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data?.data.id}.png`}
          />
        </div>
      </div>
    </>
  )
}

export default DetailPokemon
