
import { useState, useMemo, useEffect, useContext, useCallback } from "react";
import { UserContext } from "../context/UserContext";
import useLocaleStorage from "./useLocalStorage";
import { IPost } from "../types/IPost";
import { IUser } from "../types/IUser";

const usePosts = () => {
    const { user } = useContext(UserContext)

    const {
        getItems,
        saveItems,
    } = useLocaleStorage()

    const [posts, setPosts] = useState<IPost[]>(() => getItems("posts", [{ id: "1", userId: "user1", text: "Попробуйте на вкус новый Coca-Cola", createdAt: new Date().toISOString(), likes: [], comments: []}]))

    const getPosts = useCallback((userId: string): IPost[] => {
        if (!user) {
            return [];
        }
        return posts.filter((post) => post.userId === userId)
    }, [posts, user])


    const createPost = useCallback((text: string): void => {
        if (!user) return;

        const newPost = {
            id: crypto?.randomUUID() ?? Date.now().toString(),
            userId: user.id,
            text,
            createdAt: new Date().toISOString(),
            likes: [],
            comments: [],
        }
        setPosts((prev) => [newPost, ...prev])
    }, [user])

    const deletePost = useCallback((postId: string): void => {
        if (confirm("Удалить пост?")) {
            setPosts((prev) => prev.filter((post) => post.id !== postId))
        }
    }, [])

    const toggleLike = useCallback((postId: string, userId: string): void => {
        setPosts(prevPosts => prevPosts.map(post => {
            if (post.id === postId) {
                const isLiked = post.likes.includes(userId);
                return {
                    ...post,
                    likes: isLiked ? post.likes.filter(id => id !== userId) : [...post.likes, userId]
                };
            }
            return post;
        }));
    }, [])

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