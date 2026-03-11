import { IPost } from "./IPost";

export interface IUser {
    id: string;
    login: string;
    password?: string;
    posts?: IPost[];
}