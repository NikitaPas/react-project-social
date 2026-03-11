import { useContext } from "react"
import SideBar from "../components/SideBar/SideBar"
import UserInfo from "../components/UserInfo/UserInfo"
import { UserContext } from "../context/UserContext"
import { PostContext } from "../context/PostContext"
import PostForm from "../components/PostForm/PostForm"
import PostsList from "../components/Posts/PostsList"
import { useParams } from "react-router-dom"
import { IUser } from "../types/IUser"
import { IPost } from "../types/IPost"
import NavItem from "../components/NavItem/NavItem"

const ProfilePage = () => {

    const { userId } = useParams<string>();
    const {
        isAuth,
        getUserById,
        user,
    } = useContext(UserContext)

    const {
        getPosts,
    } = useContext(PostContext)

    const profileUser: IUser | undefined = userId ? getUserById(userId) : undefined;

    const posts: IPost[] = userId ? getPosts(userId) : [];

    if (!profileUser) {
        return (
            <div className="flex min-h-screen bg-gray-950 text-white justify-center items-center">
                <h1 className="text-2xl font-bold">Пользователь не найден 😕</h1>
                <NavItem to="/">На главную</NavItem>
            </div>
        );
    }

    const isMyProfile = profileUser.id === user?.id;

    return (
        <div className="flex min-h-screen bg-gray-950 text-white">
            <SideBar />
            <main className="flex-1 flex justify-center p-4 sm:p-8 md:ml-20 lg:ml-64">
                <div className=" w-full max-w-4xl min-w-[430px] flex flex-col gap-8">
                    {isAuth ?
                        (
                            <div>
                                <UserInfo
                                    user={profileUser}
                                    posts={posts}
                                />
                                {isMyProfile ? (<PostForm />) : (<div></div>)}
                                <PostsList posts={posts} />
                            </div>

                        ) :
                        (<p>Please Login or Register</p>)}
                </div>
            </main>
        </div>
    )
}

export default ProfilePage