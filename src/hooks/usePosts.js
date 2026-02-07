
import { useState, useMemo, useEffect, useContext, useCallback } from "react";
import { UserContext } from "../context/UserContext";
import useLocaleStorage from "./useLocalStorage";

const usePosts = () => {
    const { user } = useContext(UserContext)

    const {
        getItems,
        saveItems,
    } = useLocaleStorage()

    const [posts, setPosts] = useState(() => getItems("posts", [{ id: 1, userId: "user1", text: "Попробуйте на вкус новый Coca-Cola", createdAt: Date.now.toString() }]))

    const myPosts = useMemo(() => {
        if (!user) {
            return [];
        }
        return posts.filter((post) => post.userId === user.id)
    }, [posts, user])


    const createPost = useCallback((text) => {
        if (!user) return;

        const newPost = {
            id: crypto?.randomUUID() ?? Date.now().toString(),
            userId: user.id,
            text,
            createdAt: new Date().toISOString(),
        }
        setPosts((prev) => [newPost, ...prev])
    }, [user])

    useEffect(() => {
        saveItems("posts", posts)
    }, [posts])

    return {
        posts,
        createPost,
        myPosts
    }
}

export default usePosts