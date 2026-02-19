import { useContext } from "react"
import PostsList from "../components/Posts/PostsList"
import SideBar from "../components/SideBar/SideBar"
import { PostContext } from "../context/PostContext"
import { UserContext } from "../context/UserContext"

const MainPage = (props) =>{
    const {
        user,
        // isAuth
    } = useContext(UserContext)
    const isAuth = true
    const {posts} = useContext(PostContext)

    return (
        <div className="flex min-h-screen bg-gray-950 text-white">
            <SideBar />
            <main className="flex-1 flex justify-center p-4 sm:p-8 md:ml-20 lg:ml-64">
                <div className=" w-full max-w-4xl min-w-[430px] flex flex-col gap-8">
                    {isAuth ? 
                    (
                        <div> <PostsList 
                        posts = {posts}
                        user = {user}
                    />
                    </div>
                    ) :
                    (<p>Please LogIN or Register</p>)}
            </div>
            </main>
        </div>
    )
}

export default MainPage