import InputField from "../InputField/InputField"
import Button from "../Button/Button"
import { useState, useEffect, useContext, useRef } from "react"
import { UserContext } from "../../context/UserContext"
import { Link } from "react-router-dom"

const AuthForm = () => {

    const {
        loginUser,
        isUserCreated,
    } = useContext(UserContext)

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const loginRef = useRef(null)
    const passwordRef = useRef(null)

    const onSubmit = (event) => {
        event.preventDefault();
        if (login.trim().length === 0 || password.trim().length === 0) {
            return setError('Заполните все поля')
        }

        const findUser = isUserCreated(login.trim())

        if (!findUser) {
            loginRef.current?.focus();
            return setError("Пользователь с таким логином не найден")
        }

        if (findUser.password === password.trim()) {
            loginUser({ id: findUser.id, login: login })
        }
        else {
            passwordRef.current?.focus();
            return setError('Неправильный пароль')
        }
    }

    useEffect(() => { setError('') }, [login, password])


    return (

        <div className='bg-gray-800 flex flex-col justify-center'>
            <form onSubmit={onSubmit} className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8'>
                <h2 className='text-4xl dark:text-white font-bold text-center'>SIGN IN</h2>
                <InputField
                    type="text"
                    value={login}
                    ref={loginRef}
                    isInvalid={!!error && error.includes("логином")}
                    placeholder="Login"
                    onInput={(event) => setLogin(event.target.value)}
                >
                    Login
                </InputField>
                <InputField
                    type="password"
                    value={password}
                    ref={passwordRef}
                    isInvalid={!!error && error.includes("пароль")}
                    placeholder="Password"
                    onInput={(event) => setPassword(event.target.value)}
                >
                    Password
                </InputField>
                {error && (
                    <p className="dark:text-orange-600 font-bold text-center">{error}</p>
                )}
                <Button>Login</Button>
                <p className="mt-4 text-gray-400 text-center text-sm">
                    Нет аккаунта?{' '}
                    <Link
                        to="/register"
                        className="text-blue-500 hover:text-blue-400 font-semibold transition-colors duration-300"
                    >
                        Зарегистрироваться
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default AuthForm