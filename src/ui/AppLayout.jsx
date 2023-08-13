import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../features/cart/CartOverview';
import Header from './Header';
import Loader from './loader';

const AppLayout = () => {
  const navigate = useNavigation();
  const isLoading = navigate.state === 'loading'

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
        <Header /> 
        <div className='overflow-scroll'>  
          <main className="mx-auto max-w-3xl">
              <Outlet />
          </main>
        </div>
        <CartOverview />
    </div>
  )
}
 
export default AppLayout   