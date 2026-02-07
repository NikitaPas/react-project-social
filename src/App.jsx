import { Route, Routes } from "react-router-dom"
import AuthPage from "./pages/AuthPage"
import RegisterPage from "./pages/RegisterPage"
import ProfilePage from "./pages/ProfilePage"

function App() {

  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<ProfilePage />}></Route>
    </Routes>

  )
}

export default App
