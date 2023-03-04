import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { getFromLocalStorage, setToLocalStorage } from '../utils/localStorage'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()
  useEffect(() => {
    if (getFromLocalStorage('userInfo')) return navigate('/')
  }, [navigate])

  const userRegisterApi = async ({ name, email, password }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/auth/register`,
        {
          name,
          email,
          password,
        },
       { headers:{'Access-Control-Allow-Origin':'*'}},
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
    if (!name || !email || !password) return null

    if (password !== confirmPassword) {
      setError('Your password and confirm password do not match')
      setTimeout(() => {
        setError('')
      }, 5000)
      return null
    }

    userRegisterApi({
      name,
      email,
      password,
      confirmPassword,
    })
  }

  return (
    <FormContainer>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='col-lg-5 col-md-8 col-12 mx-auto shadow-sm p-5'>
          {error && (
            <div className='alert alert-danger text-center mb-3'>{error}</div>
          )}
          <h1 className='title text-center'>Registration Form</h1> <hr />
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type='text'
              className='form-control'
              id='name'
              required
            />
          </div>
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
            <label htmlFor='confirmPassword' className='form-label'>
              Confirm Password
            </label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type='password'
              className='form-control'
              id='confirmPassword'
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='register'>Already have an account?</label>{' '}
            <Link to='/login'>Login</Link>
          </div>
          <button type='submit' className='btn btn-primary w-100 text-light'>
            REGISTER
          </button>
        </div>
      </form>
    </FormContainer>
  )
}

export default Register
