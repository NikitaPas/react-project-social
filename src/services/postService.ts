import { IUser } from "../types/IUser";
import { IPost } from "../types/IPost";

export const getUserPosts = (posts: IPost[], userId: IUser['id']): IPost[] => {

  return posts.filter((post) => post.userId === userId)
}


export const createPost = (user: IUser, text: string): IPost => ({
  id: crypto?.randomUUID() ?? Date.now().toString(),
  userId: user.id,
  text,
  createdAt: new Date().toISOString(),
  likes: [],
  comments: [],
})

export const deletePostById = (posts: IPost[], postId: string): IPost[] => {
  return posts.filter(post => post.id !== postId);
}

export const toggleLikeForPost = (posts: IPost[], postId: string, userId: string): IPost[] =>
  posts.map(post => {
    if (post.id !== postId) return post;

    const isLiked = post.likes.includes(userId);
    return {
      ...post,
      likes: isLiked
        ? post.likes.filter(id => id !== userId)
        : [...post.likes, userId],
    };
  });