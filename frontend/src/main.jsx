import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FlashMessageProvider } from './FlashMessageContext';


ReactDOM.createRoot(document.getElementById('root')).render(
     <FlashMessageProvider>
        <App />
    </FlashMessageProvider>
)
