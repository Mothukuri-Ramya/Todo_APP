import React from 'react'
import Avatar from 'react-avatar'
import { Link, useLocation } from 'react-router-dom'
import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from '../utils/localStorage'

const Nav = () => {
  const { pathname } = useLocation()

  getFromLocalStorage('userInfo')

  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-primary'>
      <div className='container'>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav '>
            <li className='nav-item fs-4 title'>
              <Link
                className={pathname === '/' ? 'active nav-link' : 'nav-link'}
                to='/'
              >
                TODO APP
              </Link>
            </li>
          </ul>
          <ul className='navbar-nav ms-auto'>
            {getFromLocalStorage('userInfo') ? (
              <>
                <li className='nav-item'>
                  <div className='flex justify-content-start align-items-center nav-link'>
                    <Avatar
                      name={getFromLocalStorage('userInfo')?.name}
                      size='20'
                      textSizeRatio={1.75}
                      round='25px'
                      className='mb-1'
                    />{' '}
                    <span>{getFromLocalStorage('userInfo')?.name}</span>
                  </div>
                </li>
                <li className='nav-item'>
                  
                  <Link
                    onClick={() => removeFromLocalStorage('userInfo')}
                    className='nav-link'
                    to='/login'
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className='nav-item'>
                  <Link
                    className={
                      pathname === '/register' ? 'active nav-link' : 'nav-link'
                    }
                    to='/register'
                  >
                    Register
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      pathname === '/login' ? 'active nav-link' : 'nav-link'
                    }
                    to='/login'
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav
