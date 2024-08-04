
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { CartProvider } from '../component/api/CartContext';

const Layout = () => {

  return (
    <>
     <CartProvider>
     <Header />
        <Outlet />
        <Footer />
     </CartProvider>
        
    </>
  )
}

export default Layout