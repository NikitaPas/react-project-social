import { Route, Routes } from "react-router-dom"
import AuthPage from "./pages/AuthPage"
import RegisterPage from "./pages/RegisterPage"
import ProfilePage from "./pages/ProfilePage"
import MainPage from "./pages/MainPage"

function App() {

  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/myprofile" element={<ProfilePage />}></Route>
      <Route path="/" element={<MainPage />}></Route>
    </Routes>

  )
}

export default App
