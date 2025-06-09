import { Routes , Route} from 'react-router-dom'
import { Home } from './pages/Home'
import User from './pages/User'

const Outlet = () => {
  return (
    <div>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/user/:id" element={<User/>}/>

    </Routes>

    </div>
  )
}

export default Outlet