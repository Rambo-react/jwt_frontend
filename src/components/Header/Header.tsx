import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../store'

export const Header = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => !!state.auth.authData.accessToken
  )

  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Main</Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to='/dashboard'>Dashboard</Link>
          </li>
        )}
      </ul>
    </nav>
  )
}
