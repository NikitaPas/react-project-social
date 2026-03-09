export interface IPost {
    id: string;
    userId: string;
    text: string;
    createdAt: string;
    likes?: string[];
}