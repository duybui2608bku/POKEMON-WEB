import './Landingpage.scss'
import ash from '../../assets/Kantoash.webp'
import poke from '../../assets/Remove-bg.ai_1713943132144.png'
import { useNavigate } from 'react-router-dom'
const nagivate = useNavigate()
const LandingPage = () => {
  return (
    <>
      <div className='landing-page-container'>
        <div className='image'>
          <div className='image-one'>
            <img src={ash} alt='ash' />
          </div>
          <div className='image-two'>
            <img src={poke} alt='poke' />
          </div>
        </div>
        <div className='des'>
          <div className='title'>Discover and collect extraordinary</div>
          <div className='title-main'>Your Pokemon</div>
          <button onClick={() => alert('ok')}>Collect Now </button>
        </div>
      </div>
    </>
  )
}

export default LandingPage
