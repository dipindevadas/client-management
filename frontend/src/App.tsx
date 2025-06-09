

import './App.css'

import Navbar from './components/Navbar'
import Outlet from './components/Outlet'
import {Toaster} from 'react-hot-toast'

function App() {

  
  return (
    <>
     <Navbar/>
     <Outlet/>

     <Toaster position='top-right'/>
     
    </>
  )
}

export default App
