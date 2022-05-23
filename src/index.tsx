import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import HomePage from './pages/HomePage'
import reportWebVitals from './reportWebVitals'
import NewClientPage from './pages/NewClientPage'
import UpdateClientPage from './pages/UpdateClientPage'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='new-client' element={<NewClientPage />} />
        <Route path='clients/:id' element={<UpdateClientPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
