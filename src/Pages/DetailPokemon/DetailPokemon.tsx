import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import getDetailPokemon from '../../Apis/PokemonDetail'
import './DetailPokemon.scss'
import getDetailPokemonSpecie from '../../Apis/PokemonSpecie'
import { useEffect, useState } from 'react'
import getPokemonEvalution from '../../Apis/PokemonEvaluetion'
import { Col, Row, Skeleton } from 'antd'
const DetailPokemon = () => {
  const idPokemon = useParams()
  const id = idPokemon.id as string
  const [des, setDes] = useState('')
  const [idEvo, setIdEvo] = useState<number[]>([])

  const { data: DetailPokemon, isLoading } = useQuery({
    queryKey: ['detailPokemon', idPokemon],
    queryFn: () => {
      return getDetailPokemon(id)
    }
  })
  console.log(idEvo)

  useEffect(() => {
    const fetchDescription = async () => {
      if (DetailPokemon) {
        const descriptionResponse = await getDetailPokemonSpecie(DetailPokemon.data.name)
        setDes(descriptionResponse.data.flavor_text_entries[0].flavor_text)
        const resEvo = await getPokemonEvalution(
          descriptionResponse.data.evolution_chain.url
            .slice(
              Number(descriptionResponse.data.evolution_chain.url.length - 4),
              Number(descriptionResponse.data.evolution_chain.url.length)
            )
            .replace(/[^\d]/g, '')
        )
        console.log(resEvo)
        if (resEvo.data.chain.species) {
          setIdEvo((prev) => [
            ...prev,
            Number(
              resEvo.data.chain.species.url
                .slice(
                  Number(resEvo.data.chain.species.url.length - 5),
                  Number(resEvo.data.chain.species.url.length - 1)
                )
                .replace(/[^\d]/g, '')
            )
          ])
        }
        if (resEvo.data.chain.evolves_to?.length) {
          setIdEvo((prev) => [
            ...prev,
            Number(
              resEvo.data.chain.evolves_to?.[0].species.url
                .slice(
                  Number(resEvo.data.chain.evolves_to?.[0].species.url.length - 5),
                  Number(resEvo.data.chain.evolves_to?.[0].species.url.length - 1)
                )
                .replace(/[^\d]/g, '')
            )
          ])
        }
        if (resEvo.data.chain.evolves_to?.[0].evolves_to?.length) {
          setIdEvo((prev) => [
            ...prev,
            Number(
              resEvo.data.chain.evolves_to?.[0].evolves_to?.[0].species.url
                .slice(
                  Number(resEvo.data.chain.evolves_to?.[0].evolves_to?.[0].species.url.length - 5),
                  Number(resEvo.data.chain.evolves_to?.[0].evolves_to?.[0].species.url.length - 1)
                )
                .replace(/[^\d]/g, '')
            )
          ])
        }
      }
    }
    fetchDescription()
  }, [DetailPokemon])

  return (
    <>
      <div className='detail-pokemon-container'>
        {DetailPokemon && (
          <Row>
            <Col className='left' xs={24} md={24} xl={12}>
              <div className='img-pokemon'>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${DetailPokemon?.data.id}.png`}
                />
              </div>
              <div className={`back-${DetailPokemon.data.types[0].type.name}`}></div>
            </Col>
            <Col className='right' xs={24} md={24} xl={12}>
              <div className='id-poke'>#{DetailPokemon?.data.id}</div>
              <div className='name-poke'>
                {isLoading ? (
                  <Skeleton active />
                ) : (
                  DetailPokemon?.data.name.charAt(0).toUpperCase() + DetailPokemon?.data.name.slice(1)
                )}
              </div>
              <div className='des-poke'>{des}</div>
              <div className='evo-poke'>
                <div className='evo-1'>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idEvo[0]}.svg`}
                  />
                </div>
                {idEvo.length > 1 && (
                  <div className='evo-2'>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idEvo[1]}.svg`}
                    />
                  </div>
                )}
                {idEvo.length > 2 && (
                  <div className='evo-3'>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idEvo[2]}.svg`}
                    />
                  </div>
                )}
              </div>
            </Col>
          </Row>
        )}
      </div>
    </>
  )
}

export default DetailPokemon
