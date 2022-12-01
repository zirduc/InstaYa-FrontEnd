import React from 'react'
import ReactDOM from 'react-dom/client'
import { InstaYa } from './InstaYa'
import { AuthProvider } from './context/auth-context'
import { SingleProvider } from './context/single-context'


import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SingleProvider>
        <InstaYa />
      </SingleProvider>
    </AuthProvider>
  </React.StrictMode>
)
