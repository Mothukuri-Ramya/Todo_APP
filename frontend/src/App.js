import { FaPlusCircle } from 'react-icons/fa'
import { Routes, Route, Link } from 'react-router-dom'
import Nav from './components/Nav'
import Details from './screens/Details'
import Form from './screens/Form'
import Home from './screens/Home'
import Login from './screens/Login'
import Register from './screens/Register'

function App() {
  return (
    <div>
      <Nav />
      <main className='container py-1'>
        <div
          className='position-absolute'
          style={{ bottom: '20px', right: '20px', zIndex: 1000 }}
        >
          <Link to='/todo/form'>
            <FaPlusCircle className='fs-1' />
          </Link>
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='todo/form' element={<Form />} />
          <Route path='todo/form/:id' element={<Form />} />
          <Route path='todo/details/:id' element={<Details />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
