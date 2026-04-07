import InputField from "../InputField/InputField"
import Button from "../Button/Button"
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { Link, useNavigate } from "react-router-dom"
import { UserContextType } from "../../types/UserContextType"
import { Form, Formik, FormikErrors } from "formik"
import { useTranslation } from "react-i18next" // 1. Импортируем хук

interface FormValues {
  login: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const { register, loginUser, isUserCreated } = useContext(UserContext) as UserContextType
  const navigate = useNavigate();
  const { t } = useTranslation() 

  const validate = (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};

    if (!values.login || !values.password || !values.confirmPassword) {
      errors.login = 'Заполните все поля';
    }
    else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Пароли не совпадают';
    }

    return errors;
  }

  return (
    <div className='bg-gray-800 flex flex-col justify-center min-h-screen'>
      <Formik
        initialValues={{ login: '', password: '', confirmPassword: '' }}
        validate={validate}
        onSubmit={(values, { setFieldError }) => {
          if (isUserCreated(values.login)) {
            return setFieldError('login', t('registerForm.sameLoginError'));
          }

          const newUser = register(values.login, values.password);
          loginUser(newUser);
          navigate("/");
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8'>
            <h2 className='text-4xl dark:text-white font-bold text-center'>Register</h2>

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
              isInvalid={touched.password && !!errors.confirmPassword}
              placeholder="Password"
            >
              Password
            </InputField>

            <InputField
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.confirmPassword && !!errors.confirmPassword}
              placeholder="Repeat password"
            >
              Repeat password
            </InputField>

            {(errors.login || errors.password || errors.confirmPassword) && (
              <p className="text-red-500 font-bold text-center mt-2">
                {errors.login || errors.confirmPassword || errors.password}
              </p>
            )}

            <Button type="submit">Register</Button>

            <p className="mt-4 text-gray-400 text-center text-sm">
              Уже есть аккаунт?{' '}
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-400 font-semibold transition-colors duration-300"
              >
                Войти
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default RegisterForm
