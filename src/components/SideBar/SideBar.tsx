import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import NavItem from "../NavItem/NavItem"

const SideBar = () => {
    const {
        isAuth,
        user,
        logout,
    } = useContext(UserContext) as { isAuth: boolean, user: { login: string, id: string }, logout: () => void }

    return (
        <aside className="
      /* Базовые стили для фиксации */
      fixed z-50 transition-all duration-300 bg-blue-900
      
      /* Мобильный вид: снизу */
      bottom-0 left-0 w-full h-16 border-t border-gray-200
      
      /* Десктопный вид: ВСЕГДА слева, на всю высоту */
      md:top-0 md:left-0 md:h-screen md:w-20 lg:w-64 md:border-t-0 md:border-r
    ">
            <div className="flex h-full md:flex-col items-center md:items-stretch p-2 md:p-4">

                {isAuth ? (
                    <div>
                        <NavItem
                            className="hidden md:flex items-center justify-center h-12 mb-8 bg-blue-600 rounded-xl text-white font-bold"
                            to={`/profile/${user.id}`}
                        > Hi, {user.login}</NavItem>
                        <nav className="flex flex-1 flex-row md:flex-col justify-around md:justify-start gap-5">
                            <NavItem to=''>Message</NavItem>
                            <NavItem to="/">Publications</NavItem>
                            <NavItem to=''>Settings</NavItem>
                        </nav>
                    </div>


                ) : (
                    <NavItem to="/register"
                        className="hidden md:flex items-center justify-center h-12 mb-8 bg-blue-600 rounded-xl text-white font-bold"
                    >Register</NavItem>
                )}
                <div className="hidden md:block mt-auto pt-4 border-t border-gray-100">
                    {isAuth ?
                        (<NavItem onClick={() => logout()}> Logout </NavItem>)
                        : (<div></div>)}
                </div>

            </div>
        </aside>
    )
}

export default SideBar