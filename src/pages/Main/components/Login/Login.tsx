import React, { FormEvent, useState } from 'react'
import { useAppDispatch } from '../../../../store'
import { loginUser } from '../../../../store/auth/actionCreators'

export const Login = () => {
  const dispatch = useAppDispatch()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(loginUser({ login, password }))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='login'>Login:</label>
          <input
            id='login'
            name='login'
            type='text'
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            name='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  )
}
