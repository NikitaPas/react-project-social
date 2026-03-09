import { createContext, useEffect, useState, useCallback, ReactNode, FC } from "react";
import useLocaleStorage from "../hooks/useLocalStorage";
import { IUser } from "../types/IUser";

export interface UserContextType {
    user: IUser | null;
    loginUser: (data: {id: string, login: string}) => void;
    isAuth: boolean;
    logout: ()=> void;
    register: (id: string, login: string) => IUser;
    registeredUsers: IUser[];
    isUserCreated: (login: string) => IUser | undefined;
    getUsernameById: (id: string) => string;
    getUserById: (id: string) => IUser | undefined;
}


export const UserContext = createContext<UserContextType | null>(null)

export const UserProvider: FC<{children: ReactNode}> = ({children}) => {
    const {
        getItems,
        saveItems,
    } = useLocaleStorage()

    const [registeredUsers, setRegisteredUsers] = useState<IUser[]>(() => getItems("users", [{ id: "user1", login: "admin", password: "123", posts: [] }]))

    const [user, setUser] = useState<IUser | null>(() => getItems("activeUser", null))

    const isAuth = !!user
    const loginUser = useCallback((data: { id: string; login: string; }) => {
        console.log(data)
        setUser({ id: data.id, login: data.login })
    }, [])

    const isUserCreated = (loginToAuth: string) =>{
        const findUser = registeredUsers.find((user) => user.login.toLowerCase() == loginToAuth.toLowerCase().trim());
        return findUser;
    }

    const logout = useCallback(() => setUser(null), [])

    const register = useCallback((login: string, password: string) => {
        const newUser = {
            id: crypto?.randomUUID() ?? Date.now().toString(),
            login: login,
            password: password,
        }
        setRegisteredUsers((prev) => [...prev, newUser]);
        return newUser;
    }, [])

    const getUsernameById = (id: string)=>{
        const findUsernameById = registeredUsers.find((user) => user.id === id);
        return findUsernameById!.login;
    }

    const getUserById = (id: string) =>{
        const profileUser = registeredUsers.find((user)=> user.id === id)
        return profileUser;
    }

    useEffect(() => {
        saveItems("users", registeredUsers)
    }, [registeredUsers])

    useEffect(() => {
        saveItems('activeUser', user)
    }, [user])

    console.log(isAuth)
    console.log(getUsernameById("user1"))
    return (
        <UserContext.Provider
            value={{
                user,
                loginUser,
                isAuth,
                logout,
                register,
                registeredUsers,
                isUserCreated,
                getUsernameById,
                getUserById,
            }}>
            {children}
        </UserContext.Provider>
    )
}