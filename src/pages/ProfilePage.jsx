import { useContext } from "react"
import SideBar from "../components/SideBar/SideBar"
import UserInfo from "../components/UserInfo/UserInfo"
import { UserContext } from "../context/UserContext"
import PostForm from "../components/PostForm/PostForm"

const ProfilePage = () => {

    const { isAuth } = useContext(UserContext)

    return (
        <div className="flex min-h-screen bg-gray-950 text-white">
            <SideBar />
            <main className="flex-1 flex justify-center p-4 sm:p-8">
                <div className=" w-full max-w-4xl min-w-[430px] flex flex-col gap-8">
                    {isAuth ?
                        (
                            <div>
                                <UserInfo />
                                <PostForm />
                            </div>

                        ) :
                        (<p>Please Login or Register</p>)}
                </div>
            </main>
        </div>
    )
}

export default ProfilePage