import { createContext } from "react";
import usePosts from "../hooks/usePosts";

export const PostContext = createContext({})

export const PostProvider = (props) => {
    const { children } = props;

    const {
        posts,
        myPosts,
        createPost,
        deletePost,
        toggleLike
    } = usePosts()

    console.log(JSON.parse(localStorage.getItem('posts')))
    return (
        <PostContext.Provider
            value={{
                posts,
                myPosts,
                createPost,
                deletePost,
                toggleLike,
            }}>
            {children}
        </PostContext.Provider>
    )
}

