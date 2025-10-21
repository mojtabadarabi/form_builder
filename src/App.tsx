import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages'
import MainLayout from './layout/MainLayout'
import SingleForm from './pages/editForm'
import CreateForm from './pages/createForm'

function App() {

  return (
    <div className='bg-gray-200 min-h-[100vh]'>
      <Routes>
        <Route path='/' element={<MainLayout />} >
          <Route index element={<HomePage/>}/>
          <Route path={`/forms/create`} element={<CreateForm />}/>
          <Route path={`/forms/:id`} element={<SingleForm />}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
