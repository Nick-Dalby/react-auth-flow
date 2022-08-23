import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import '@picocss/pico'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthProvider'

import './index.css'

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools()
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  //  <React.StrictMode>
  <HashRouter>
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </AuthProvider>
  </HashRouter>
  //  </React.StrictMode>
)
