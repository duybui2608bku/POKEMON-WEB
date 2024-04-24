import { Outlet } from 'react-router-dom'
import logo from '../../assets/logo.png'
import './Header.scss'
import { FaBars } from 'react-icons/fa'
import { useState } from 'react'
const Header = () => {
  const [bar, setBar] = useState<Boolean>(false)
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
          <div className='active'>Home</div>
          <div>Elemental</div>
          <div>Total Pokemon</div>
          <div>About</div>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Header
