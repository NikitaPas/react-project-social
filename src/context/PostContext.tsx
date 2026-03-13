import { createContext, FC, ReactNode } from "react";
import usePosts from "../hooks/usePosts";
import { PostContextType } from "../types/PostContextType";

export const PostContext = createContext<PostContextType>({} as PostContextType)

export const PostProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const {
        posts,
        getPosts,
        createPost,
        deletePost,
        toggleLike,
        addComment
    } = usePosts()

    return (
        <PostContext.Provider
            value={{
                posts,
                getPosts,
                createPost,
                deletePost,
                toggleLike,
                addComment,
            }}>
            {children}
        </PostContext.Provider>
    )
}

