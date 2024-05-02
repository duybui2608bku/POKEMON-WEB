import { useQuery } from '@tanstack/react-query'
import './GamePolemom.scss'
import getDetailPokemon from '../../Apis/PokemonDetail'
import { useState } from 'react'
import logo from '../../assets/logo-game.png'
import { Input, Skeleton } from 'antd'

const GamePokemon = () => {
  const id = () => {
    return Math.floor(Math.random() * 500)
  }

  const [idPoke, setIdPoke] = useState<number>(id())
  const [isViewPoke, setIsViewPoke] = useState<boolean>(false)
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const [mp3, setMp3] = useState<boolean>(false)
  const { data: DetaiPoke, isLoading } = useQuery({
    queryKey: ['gamePoke', idPoke],
    queryFn: () => {
      return getDetailPokemon(idPoke)
    }
  })

  let namePokemon = DetaiPoke?.data.name

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (e.currentTarget as HTMLInputElement).value
    if (namePokemon === value) {
      setIsViewPoke(true)
      setIsCorrect(true)
    } else {
      setIsCorrect(false)
    }
  }

  const handleDontKnow = () => {
    setIsViewPoke(true)
    setIsCorrect(true)
  }

  const handleNextQuestion = () => {
    setIsCorrect(false)
    setIsViewPoke(false)
    setIdPoke(id())
  }

  return (
    <>
      <div className='game-poke-container'>
        {isLoading ? (
          <Skeleton.Image className='img-poke' style={{ width: '500px', height: '400px' }} active />
        ) : (
          <div className='img-poke'>
            <img
              style={isViewPoke ? {} : { filter: 'brightness(0) saturate(0%)' }}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${DetaiPoke?.data.id}.png`}
            />
          </div>
        )}
        <div className='name' style={isCorrect ? { display: 'block' } : { display: 'none' }}>
          {DetaiPoke?.data.name}
        </div>

        <div className='name-poke'>
          <div className='logo'>
            <img src={logo} />
          </div>
          <div className='input-name'>
            <Input status={isCorrect ? '' : 'error'} allowClear onPressEnter={handleSubmit} />
          </div>
          <div className='button'>
            <button onClick={handleDontKnow}>I dont know</button>
            <button onClick={handleNextQuestion}>Next Pokemon</button>
          </div>
        </div>
      </div>
    </>
  )
}
export default GamePokemon
