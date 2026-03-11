import { createContext, useEffect, useState, useCallback, ReactNode, FC } from "react";
import useLocaleStorage from "../hooks/useLocalStorage";
import { IUser } from "../types/IUser";
import { UserContextType } from "../types/UserContextType";

export const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
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

    const isUserCreated = (loginToAuth: string): IUser | undefined => {
        const findUser = registeredUsers.find((user) => user.login.toLowerCase() == loginToAuth.toLowerCase().trim());
        return findUser;
    }

    const logout = useCallback(() => setUser(null), [])

    const register = useCallback((login: string, password: string): IUser => {
        const newUser = {
            id: crypto?.randomUUID() ?? Date.now().toString(),
            login: login,
            password: password,
        }
        setRegisteredUsers((prev) => [...prev, newUser]);
        return newUser;
    }, [])

    const getUsernameById = (id: string): string => {
        const findUsernameById = registeredUsers.find((user) => user.id === id);
        return findUsernameById!.login;
    }

    const getUserById = (id: string): IUser | undefined => {
        const profileUser = registeredUsers.find((user) => user.id === id)
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