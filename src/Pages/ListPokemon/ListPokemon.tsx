import { useQuery } from '@tanstack/react-query'
import getListPokemon from '../../Apis/ListPokemon.api'
import useQueryConfig from '../../Hooks/useQueryConfig'
import './ListPokemon.scss'
import getDetailPokemon from '../../Apis/PokemonDetail'
import { Badge, Col, Pagination, Row } from 'antd'
import { useNavigate } from 'react-router-dom'

const ListPokemon = () => {
  const queryConfig = useQueryConfig()
  const { data: ListPokemon } = useQuery({
    queryKey: ['pokemon', queryConfig],
    queryFn: async () => {
      const data = await getListPokemon(queryConfig)
      const details = await Promise.all(data.data.results.map((item) => getDetailPokemon(item.name)))
      return details
    }
  })

  console.log(ListPokemon)

  const nagivate = useNavigate()

  const handleChange = (current: any) => {
    nagivate(`?limit=8&offset=${(current - 1) * 8}`)
  }

  return (
    <div className='pokemon-container'>
      <Row gutter={[30, 30]} style={{ marginBottom: '30px' }}>
        {ListPokemon?.map((item) => (
          <Col xl={6} key={item.data.id}>
            <Badge.Ribbon text={`#${item.data.id}`} color='orange'>
              <div className='pokemon-detail'>
                <div className='img-pokemon'>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item.data.id}.svg`}
                    alt={item.data.name}
                  />
                </div>
                <div className='name-pokemon'>{item.data.name}</div>
                <div className='type-pokemon'>
                  {item.data.types.map((type) => (
                    <>
                      <div key={type.type.name} className={`type ${type.type.name}`}>
                        {type.type.name}
                      </div>
                      <div className={`back-gnd ${type.type.name}`}></div>
                    </>
                  ))}
                </div>
              </div>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
      <Pagination className='pagi' defaultCurrent={1} total={650} onChange={handleChange} />
    </div>
  )
}

export default ListPokemon
