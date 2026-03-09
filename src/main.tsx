import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { PostProvider } from './context/PostContext'

const container = document.getElementById('root') as HTMLElement;
createRoot(container).render(
  <StrictMode>
    <UserProvider>
      <PostProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PostProvider>
    </UserProvider>
  </StrictMode>
);
