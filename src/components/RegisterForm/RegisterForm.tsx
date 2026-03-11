import InputField from "../InputField/InputField"
import Button from "../Button/Button"
import { useContext, useEffect, useState, useRef } from "react"
import { UserContext } from "../../context/UserContext"
import { Link, useNavigate } from "react-router-dom"
import { UserContextType } from "../../types/UserContextType"

const RegisterForm = () => {
    const {
        register,
        loginUser,
        isUserCreated,
    } = useContext(UserContext) as UserContextType


    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const [error, setError] = useState<string>('');

    const loginRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)

    const navigate = useNavigate();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (login.trim().length === 0 || password.trim().length === 0 || confirmPassword.trim().length === 0) {
            return setError('Заполните все поля')
        }
        if (password !== confirmPassword) {
            confirmPasswordRef.current?.focus();
            return setError("Пароли не совпадают")
        }

        const isLoginTaken = !!isUserCreated(login);

        if (isLoginTaken) {
            loginRef.current?.focus();
            return setError("Пользователь с таким логином уже существует")
        }

        console.log("сработал onSubmit с такими данными: ", login, password)
        const newUser = register(login, password)
        loginUser(newUser)
        navigate("/")
    }

    useEffect(() => setError(''), [login, password, confirmPassword])
    return (
        <div className='bg-gray-800 flex flex-col justify-center'>
            <form onSubmit={onSubmit} className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8'>
                <h2 className='text-4xl dark:text-white font-bold text-center'>Register</h2>
                <InputField
                    type="text"
                    value={login}
                    ref={loginRef}
                    isInvalid={!!error && error.includes("логином")}
                    placeholder="Login"
                    onChange={(event) => setLogin(event.target.value)}
                >
                    Login
                </InputField>
                <InputField
                    type="password"
                    value={password}
                    isInvalid={!!error && error.includes("Пароли")}
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)}
                >
                    Password
                </InputField>
                <InputField
                    type="password"
                    value={confirmPassword}
                    ref={confirmPasswordRef}
                    isInvalid={!!error && error.includes("Пароли")}
                    placeholder="Repeat password"
                    onChange={(event) => setConfirmPassword(event.target.value)}
                >
                    Repeat password
                </InputField>
                {error && (
                    <p className="dark:text-orange-600 font-bold text-center">{error}</p>
                )}
                <Button>Register</Button>
                <p className="mt-4 text-gray-400 text-center text-sm">
                    Уже есть аккаунт?{' '}
                    <Link
                        to="/login"
                        className="text-blue-500 hover:text-blue-400 font-semibold transition-colors duration-300"
                    >
                        Войти
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default RegisterForm