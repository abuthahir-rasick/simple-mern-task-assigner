import { BrowserRouter } from 'react-router-dom'
import Header from './pages/Header'
import Router from './pages/Router'

function App() {
   return (
   <>
   <BrowserRouter>
    <Header/>
    <Router/>
    </BrowserRouter>
    </>
  )
}

export default App
