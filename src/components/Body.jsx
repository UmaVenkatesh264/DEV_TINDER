import Footer from './Footer'
import Navbar from './NavBar'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
  )
}

export default Body