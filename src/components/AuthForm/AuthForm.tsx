import InputField from "../InputField/InputField"
import Button from "../Button/Button"
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { Form, Formik, FormikErrors } from "formik"
import { Container, ErrorMessage, FooterText, StyledLink, Title } from "./AuthFormStyles"

interface LoginValues {
  login: string;
  password: string;
}

const AuthForm = () => {
  const { loginUser, isUserCreated } = useContext(UserContext);

  const validate = (values: LoginValues) => {
    const errors: FormikErrors<LoginValues> = {};

    if (!values.login || !values.password) {
      errors.login = 'Заполните все поля';
    }

    return errors;
  };

  return (
    <Container>
      <Formik
        initialValues={{ login: '', password: '' }}
        validate={validate}
        onSubmit={(values, { setFieldError }) => {
          const findUser = isUserCreated(values.login.trim());

          if (!findUser) {
            return setFieldError('login', "Пользователь с таким логином не найден");
          }

          if (findUser.password === values.password.trim()) {
            loginUser({ id: findUser.id, login: values.login });
          } else {
            setFieldError('password', 'Неправильный пароль');
          }
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <Title>SIGN IN</Title>

            <InputField
              name="login"
              type="text"
              value={values.login}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.login && !!errors.login}
              placeholder="Login"
            >
              Login
            </InputField>

            <InputField
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.password && !!errors.password}
              placeholder="Password"
            >
              Password
            </InputField>

            {(errors.login || errors.password) && (
              <ErrorMessage>{errors.login || errors.password}</ErrorMessage>
            )}

            <Button type="submit">Login</Button>

            <FooterText>
              Нет аккаунта?{' '}
              <StyledLink to="/register">
                Зарегистрироваться
              </StyledLink>
            </FooterText>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AuthForm;
