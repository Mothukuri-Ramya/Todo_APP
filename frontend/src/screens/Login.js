import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { getFromLocalStorage, setToLocalStorage } from '../utils/localStorage'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()
  useEffect(() => {
    if (getFromLocalStorage('userInfo')) return navigate('/')
  }, [navigate])

  const loginApi = async ({ email, password }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/auth/login`,
        {
          email,
          password,
        }
      )
      setToLocalStorage('userInfo', data)
      return navigate('/')
    } catch (error) {
      setError(error?.response?.data?.error)
      return setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) return null
    loginApi({ email, password })
  }

  return (
    <FormContainer>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='col-lg-5 col-md-8 col-12 mx-auto shadow-sm p-5'>
          {error && (
            <div className='alert alert-danger text-center mb-3'>{error}</div>
          )}
          <h1 className='title text-center'>Login Form</h1> <hr />
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type='email'
              className='form-control'
              id='email'
              aria-describedby='emailHelp'
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type='password'
              className='form-control'
              id='password'
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='register'>Don't have an account?</label>{' '}
            <Link to='/register'>Register</Link>
          </div>
          <button type='submit' className='btn btn-primary w-100 text-light'>
            LOGIN
          </button>
        </div>
      </form>
    </FormContainer>
  )
}

export default Login
