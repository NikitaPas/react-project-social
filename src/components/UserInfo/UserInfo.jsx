import { useContext, useMemo } from "react"
import { UserContext } from "../../context/UserContext"
import { PostContext } from "../../context/PostContext"

const UserInfo = () =>{
    const {
        user
    } = useContext(UserContext)

    const {
      myPosts,
    } = useContext(PostContext)

    return (
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800 flex flex-col items-center sm:flex-row sm:justify-between">
      <div className="flex flex-col items-center sm:flex-row gap-4">
        {/* Аватарка из первой буквы логина */}
        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-inner uppercase">
          {user.login?.[0]}
        </div>
        
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            @{user.login}
          </h1>
          <p className="text-gray-400 text-sm">Пользователь приложения</p>
        </div>
      </div>

      <div className="mt-4 sm:mt-0 flex gap-6 text-center">
        <div>
          <div className="text-xl font-bold text-white">{myPosts.length}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wider">Постов</div>
        </div>
        {/* Здесь можно добавить еще статы, например "Подписки" */}
      </div>
    </div>
    )
}

export default UserInfo