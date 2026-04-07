import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { PostProvider } from './context/PostContext'
import './i18n'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

const container = document.getElementById('root') as HTMLElement;
createRoot(container).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <UserProvider>
        <PostProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PostProvider>
      </UserProvider>
    </I18nextProvider>
  </StrictMode>
);
