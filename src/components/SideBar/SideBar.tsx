import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import NavItem from "../NavItem/NavItem"
import { useTranslation } from "react-i18next" // 1. Импортируем хук

const SideBar = () => {
    const { isAuth, user, logout } = useContext(UserContext)
    const { t, i18n } = useTranslation() // 2. Подключаем функции перевода

    // Функция смены языка
    const toggleLanguage = () => {
        const newLang = i18n.language === 'ru' ? 'en' : 'ru'
        i18n.changeLanguage(newLang)
    }

    return (
        <aside className="
      fixed z-50 transition-all duration-300 bg-blue-900
      bottom-0 left-0 w-full h-16 border-t border-gray-200
      md:top-0 md:left-0 md:h-screen md:w-20 lg:w-64 md:border-t-0 md:border-r
    ">
            <div className="flex h-full md:flex-col items-center md:items-stretch p-2 md:p-4">

                {isAuth ? (
                    <div>
                        <NavItem
                            className="hidden md:flex items-center justify-center h-12 mb-8 bg-blue-600 rounded-xl text-white font-bold"
                            to={`/profile/${user?.id}`}
                        > 
                            {t('sidebar.welcome')}, {user?.login} 
                        </NavItem>
                        <nav className="flex flex-1 flex-row md:flex-col justify-around md:justify-start gap-5">
                            <NavItem to=''>{t('sidebar.messages')}</NavItem>
                            <NavItem to="/">{t('sidebar.publications')}</NavItem>
                            <NavItem to=''>{t('sidebar.settings')}</NavItem>
                        </nav>
                    </div>
                ) : (
                    <NavItem to="/register"
                        className="hidden md:flex items-center justify-center h-12 mb-8 bg-blue-600 rounded-xl text-white font-bold"
                    >
                        {t('sidebar.register')}
                    </NavItem>
                )}

                <div className="hidden md:flex flex-col mt-auto pt-4 border-t border-gray-100 gap-2">
                    {/* Кнопка переключения языка */}
                    <button 
                        onClick={toggleLanguage}
                        className="flex items-center justify-center h-10 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm font-medium transition-colors"
                    >
                        {i18n.language.toUpperCase()}
                    </button>

                    {isAuth && (
                        <NavItem onClick={() => logout()}> 
                            {t('sidebar.logout')} 
                        </NavItem>
                    )}
                </div>
            </div>
        </aside>
    )
}

export default SideBar
