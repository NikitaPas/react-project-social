import InputField from "../InputField/InputField"
import Button from "../Button/Button"
import { useState, useEffect, useContext, useRef } from "react"
import { UserContext } from "../../context/UserContext"
import { Link } from "react-router-dom"
import { Container, ErrorMessage, FooterText, StyledLink, Title } from "./AuthFormStyles"

const AuthForm = () => {

  const {
    loginUser,
    isUserCreated,
  } = useContext(UserContext)

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('')

  const loginRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

    <Container>
      <form onSubmit={onSubmit}>
        <Title>SIGN IN</Title>
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
          ref={passwordRef}
          isInvalid={!!error && error.includes("пароль")}
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        >
          Password
        </InputField>
        {error && (
          <ErrorMessage>{error}</ErrorMessage>
        )}
        <Button>Login</Button>
         <FooterText>
          Нет аккаунта?{' '}
          <StyledLink
            to="/register"
          >
            Зарегистрироваться
          </StyledLink>
        </FooterText>
      </form>
    </Container>
  )
}

export default AuthForm