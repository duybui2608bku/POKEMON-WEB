import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import logo from '../../assets/logo.png'
import './Header.scss'
import { FaBars } from 'react-icons/fa'
import { useState } from 'react'
const Header = () => {
  const [bar, setBar] = useState<Boolean>(false)
  const nagivate = useNavigate()
  const active = useLocation()
  return (
    <>
      <div className='header-container'>
        <div className='logo'>
          <img src={logo} />
        </div>
        <div className='bar'>
          <FaBars onClick={() => setBar(!bar)} />
        </div>
        <div className={`menu ${bar ? 'active' : ''}`}>
          <div className={active.pathname == '/' ? 'active' : ''} onClick={() => nagivate('/')}>
            Home
          </div>
          <div className={active.pathname == '/game' ? 'active' : ''} onClick={() => nagivate('/game')}>
            Who That Pokemon
          </div>
          <div className={active.pathname == '/pokemon' ? 'active' : ''} onClick={() => nagivate('/pokemon')}>
            Total Pokemon
          </div>
          <div>About</div>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Header
