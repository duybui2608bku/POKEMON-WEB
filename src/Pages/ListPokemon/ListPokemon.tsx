import { useQuery } from '@tanstack/react-query'
import getListPokemon from '../../Apis/ListPokemon.api'
import useQueryConfig from '../../Hooks/useQueryConfig'
import './ListPokemon.scss'
import getDetailPokemon from '../../Apis/PokemonDetail'
import { Badge, Col, Pagination, Row, Skeleton } from 'antd'
import { useNavigate } from 'react-router-dom'

const ListPokemon = () => {
  const queryConfig = useQueryConfig()
  const { data: ListPokemon, isLoading } = useQuery({
    queryKey: ['pokemon', queryConfig],
    queryFn: async () => {
      const data = await getListPokemon(queryConfig)
      const details = await Promise.all(data.data.results.map((item) => getDetailPokemon(item.name)))
      return details
    }
  })

  const nagivate = useNavigate()

  const handleChange = (current: any) => {
    nagivate(`?limit=8&offset=${(current - 1) * 8}`)
  }

  return (
    <div className='pokemon-container'>
      {isLoading ? (
        <Row gutter={[30, 30]}>
          {Array(8)
            .fill(0)
            .map((_, index) => {
              return (
                <>
                  <Col key={index} sm={24} xs={24} md={12} lg={8} xl={6}>
                    <Skeleton.Image active style={{ minWidth: '330px', minHeight: '235px' }} />
                  </Col>
                </>
              )
            })}
        </Row>
      ) : (
        <Row gutter={[30, 30]} style={{ marginBottom: '30px' }}>
          {ListPokemon?.map((item) => (
            <Col sm={24} xs={24} md={12} lg={8} xl={6} key={item.data.id}>
              <Badge.Ribbon text={`#${item.data.id}`} color='orange'>
                <div className='pokemon-detail' onClick={() => nagivate(`/${item.data.id}`)}>
                  <div className='img-pokemon'>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item.data.id}.svg`}
                      alt={item.data.name}
                    />
                  </div>
                  <div className='name-pokemon'>{item.data.name.charAt(0).toUpperCase() + item.data.name.slice(1)}</div>
                  <div className='type-pokemon'>
                    {item.data.types.map((type, index) => (
                      <>
                        <div key={type.type.name} className={`type type-${type.type.name}`}>
                          {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                        </div>
                        <div className={`back-gnd back-${type.type.name}${index}`}></div>
                      </>
                    ))}
                  </div>
                </div>
              </Badge.Ribbon>
            </Col>
          ))}
        </Row>
      )}
      <Pagination className='pagi' defaultCurrent={1} total={800} onChange={handleChange} />
    </div>
  )
}

export default ListPokemon
