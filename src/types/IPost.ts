import { IUser } from "./IUser";

export type Comment = {
    userId: IUser['id'];
    text: string;
}

export interface IPost {
    id: string;
    userId: IUser['id'];
    text: string;
    createdAt: string;
    likes: IUser['id'][];
    comments: Comment[];
}