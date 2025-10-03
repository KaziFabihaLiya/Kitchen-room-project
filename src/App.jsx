
import Navbar from './components/Navbar'
import Heading from './components/Heading'
import States from './components/States'
import './App.css'
import { Flip, Slide, ToastContainer } from 'react-toastify';
import OrderContainer from './components/OrderContainer';
import { Suspense } from 'react';

const fetchOrderData = () => fetch('/json/orders.json')
.then(res => res.json());


function App() {
  const ordersPromise = fetchOrderData( );

  return (
    <>
       <div>
        <header className='py-5 w-11/12 mx-auto'>
          <Navbar></Navbar>
        </header>
        <section>
          <Heading>Welcome to Kitchen Room</Heading>
        </section>
        <section>
          <Suspense fallback={<h2>Loading Orders...</h2>}>
            <OrderContainer promise={ordersPromise}>
            
            </OrderContainer>
          </Suspense>
        </section>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition={Slide}/>
       </div>
        
    </>
  )
}

export default App
