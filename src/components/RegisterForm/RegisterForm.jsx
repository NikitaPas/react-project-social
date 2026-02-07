import InputField from "../InputField/InputField"
import Button from "../Button/Button"
import { useContext, useEffect, useState, useRef } from "react"
import { UserContext } from "../../context/UserContext"
import { Link, useNavigate } from "react-router-dom"

const RegisterForm = () => {
    const {
        register,
        loginUser,
        registeredUsers,
    } = useContext(UserContext)


    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [error, setError] = useState(null);

    const loginRef = useRef(null)
    const confirmPasswordRef = useRef(null)

    const navigate = useNavigate();

    const onSubmit = () => {
        event.preventDefault();
        if (login.trim().length === 0 || password.trim().length === 0 || confirmPassword.trim().length === 0) {
            return setError('Заполните все поля')
        }
        if (password !== confirmPassword) {
            confirmPasswordRef.current?.focus();
            return setError("Пароли не совпадают")
        }

        const isLoginTaken = registeredUsers.some((user) => user.login.toLowerCase() === login.toLowerCase().trim());

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
                    onInput={(event) => setLogin(event.target.value)}
                >
                    Login
                </InputField>
                <InputField
                    type="password"
                    value={password}
                    isInvalid={!!error && error.includes("Пароли")}
                    placeholder="Password"
                    onInput={(event) => setPassword(event.target.value)}
                >
                    Password
                </InputField>
                <InputField
                    type="password"
                    value={confirmPassword}
                    ref={confirmPasswordRef}
                    isInvalid={!!error && error.includes("Пароли")}
                    placeholder="Repeat password"
                    onInput={(event) => setConfirmPassword(event.target.value)}
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