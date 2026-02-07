import { useContext, useEffect } from "react"
import AuthForm from "../components/AuthForm/AuthForm"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import LogRegLayout from "../components/LogRegLayout"

const AuthPage = () =>{
    const {isAuth, user} = useContext(UserContext)

    const navigate = useNavigate()

    if(isAuth){
        
    }
    useEffect(() => {
        if(isAuth) navigate('/')
    }, [isAuth, navigate])

    console.log(user)
    return (
        <LogRegLayout>
            <AuthForm />
        </LogRegLayout>
    )
}

export default AuthPage