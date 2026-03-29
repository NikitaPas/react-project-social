
import { useState, useMemo, useEffect, useContext, useCallback } from "react";
import { UserContext } from "../context/UserContext";
import useLocaleStorage from "./useLocalStorage";
import { IPost } from "../types/IPost";
import { IUser } from "../types/IUser";
import { getUserPosts, createPost, deletePostById, toggleLikeForPost } from "../services/postService";

const usePosts = () => {
    const { user } = useContext(UserContext)

    const {
        getItems,
        saveItems,
    } = useLocaleStorage()

    const [posts, setPosts] = useState<IPost[]>(() => getItems("posts", [{ id: "1", userId: "user1", text: "Попробуйте на вкус новый Coca-Cola", createdAt: new Date().toISOString(), likes: [], comments: [] }]))

    const getPosts = useCallback((userId: string): IPost[] => {
        if (!user) {
            return [];
        }
        return getUserPosts(posts, userId)
    }, [posts, user])


    const createNewPost = useCallback((text: string): void => {
        if (!user) return;
        const newPost = createPost(user, text)
        setPosts((prev) => [newPost, ...prev])
    }, [user])

    const deletePost = useCallback((postId: IPost['id']): void => {
        if (confirm("Удалить пост?")) {
            setPosts((prev) => deletePostById(prev, postId))
        }
    }, [])

    const toggleLike = useCallback((postId: string, userId: string): void => {
        setPosts(prev => toggleLikeForPost(prev, postId, userId));
    }, []);

    const addComment = useCallback((userId: IUser['id'], postId: IPost['id'], text: string) => {
        setPosts(prevPosts => prevPosts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: [...(post.comments || []), { userId, text }]
                }
            }
            return post
        }))
    }, [])

    useEffect(() => {
        saveItems("posts", posts)
        console.log(posts)
    }, [posts])

    return {
        posts,
        createPost,
        getPosts,
        deletePost,
        toggleLike,
        addComment,
    }
}

export default usePosts