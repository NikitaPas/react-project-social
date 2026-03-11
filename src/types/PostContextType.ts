import { IPost } from "./IPost";

export interface PostContextType {
        posts: IPost[];
        getPosts: (userId: string) => IPost[];
        createPost: (text: string) => void;
        deletePost: (postId: string) => void;
        toggleLike: (postId: string, userId: string) => void;
}