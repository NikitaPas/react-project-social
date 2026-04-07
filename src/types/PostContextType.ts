import { IPost } from "./IPost";
import { IUser } from "./IUser";

export interface PostContextType {
        posts: IPost[];
        getPosts: (userId: IUser['id']) => IPost[];
        createNewPost: (text: string) => void;
        deletePost: (postId: IPost['id']) => void;
        toggleLike: (postId: IPost['id'], userId: IUser['id']) => void;
        addComment: (postId: IPost['id'], userId: IUser['id'], text: string) => void;
}