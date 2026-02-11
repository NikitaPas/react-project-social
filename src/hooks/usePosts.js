
import { useState, useMemo, useEffect, useContext, useCallback } from "react";
import { UserContext } from "../context/UserContext";
import useLocaleStorage from "./useLocalStorage";

const usePosts = () => {
    const { user } = useContext(UserContext)

    const {
        getItems,
        saveItems,
    } = useLocaleStorage()

    const [posts, setPosts] = useState(() => getItems("posts", [{ id: 1, userId: "user1", text: "Попробуйте на вкус новый Coca-Cola", createdAt: new Date().toISOString(), likes: [] }]))

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
            likes: [],
        }
        setPosts((prev) => [newPost, ...prev])
    }, [user])

    const deletePost = useCallback((postId) =>{
        if(confirm("Удалить пост?")){
            setPosts((prev) => prev.filter((post) => post.id !== postId))
        }
    }, [])

    const toggleLike = useCallback((postId, userId) => {
    setPosts(prevPosts => prevPosts.map(post => {
        if (post.id === postId) {
            const isLiked = post.likes.includes(userId);
            return {
                ...post,
                likes: isLiked 
                    ? post.likes.filter(id => id !== userId) // Убираем лайк
                    : [...post.likes, userId] // Добавляем лайк
            };
        }
        return post;
    }));
}, [])

    useEffect(() => {
        saveItems("posts", posts)
    }, [posts])

    return {
        posts,
        createPost,
        myPosts,
        deletePost,
        toggleLike,
    }
}

export default usePosts