import { IUser } from "./IUser";

export interface UserContextType {
    user: IUser | null;
    loginUser: (data: { id: string, login: string }) => void;
    isAuth: boolean;
    logout: () => void;
    register: (login: string, password: string) => IUser;
    registeredUsers: IUser[];
    isUserCreated: (login: string) => IUser | undefined;
    getUsernameById: (id: string) => string;
    getUserById: (id: string) => IUser | undefined;
}