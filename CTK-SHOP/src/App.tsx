import { Route, Routes } from 'react-router'
import Navbar from './Components/Navbar-Footer/Navbar'
import Footer from './Components/Navbar-Footer/Footer'

import './App.css'


function App() {
  

  return (
    <>

      {/* <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/stores" element={<Stores-list />} />
        <Route path="/items" element={<Items-list/>}/>
        <Route path="/create-store" element={<Create-store/>}/>
        <Route path="/creat-item" element={<Create-item/>}/>
        
      </Routes> */}
<Navbar/>
<Footer/>
    </>

  )
}

export default App
