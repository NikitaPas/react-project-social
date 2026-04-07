import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag'], 
      caches: ['localStorage'], 
    },
    resources: {
      ru: {
        translation: {
          auth: {
            title: "ВХОД",
            login: "Логин",
            password: "Пароль",
            submit: "Войти",
            noAccount: "Нет аккаунта?",
            register: "Зарегистрироваться",
            errors: {
              required: "Заполните все поля",
              notFound: "Пользователь не найден"
            }
          },
          sidebar: {
            welcome: 'Привет!',
            messages: 'Сообщения',
            publications: 'Публикации',
            settings: 'Настройки',
            logout: 'Выход',
            register: 'Зарегистрироваться',
          },
          postItem: {
            like: 'Нравится',
            delete: 'Удалить',
            writeCommentOpenField: 'Напишите комментарий...',
            cancelWriteComment: 'Отменить',
            writeComment: 'Комментировать',
          },
          userProfile: {
            role: 'Пользователь приложения',
            postsCount: 'Постов',
          },
          postForm: {
            InputFieldPostForm: 'Что у вас нового?',
            publishButton: 'Опубликовать'
          },
          registerForm: {
            sameLoginError: 'Пользователь с таким логином уже занят',
          }
        }

      },
      en: {
        translation: {
          auth: {
            title: "SIGN IN",
            login: "Login",
            password: "Password",
            submit: "Login",
            noAccount: "No account?",
            register: "Register",
            errors: {
              required: "All fields are required",
              notFound: "User not found"
            }
          },
          sidebar: {
            welcome: 'Hi!',
            messages: 'Messages',
            publications: 'Publications',
            settings: 'Settings',
            logout: 'Logout',
            register: 'Register'
          },
          postItem: {
            like: 'Like',
            delete: 'Delete',
            writeCommentOpenField: 'Write a comment...',
            cancelWriteComment: 'Cancel',
            writeComment: 'Comment',
          },
          userProfile: {
            role: 'Application user',
            postsCount: 'Posts',
          },
          postForm: {
            InputFieldPostForm: 'Whats happened?',
            publishButton: 'Publish',
          },
        }
      }
    }
  });

export default i18n;
