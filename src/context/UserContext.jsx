import { createContext, useEffect, useState, useCallback } from "react";
import useLocaleStorage from "../hooks/useLocalStorage";

export const UserContext = createContext({})

export const UserProvider = (props) => {
    const { children } = props
    const {
        getItems,
        saveItems,
    } = useLocaleStorage()

    const [registeredUsers, setRegisteredUsers] = useState(() => getItems("users", [{ id: "user1", login: "admin", password: "123", posts: [] }]))

    const [user, setUser] = useState(() => getItems("activeUser", null))

    const isAuth = !!user
    const loginUser = useCallback((data) => {
        console.log(data)
        setUser({ id: data.id, login: data.login })
    }, [])

    const isUserCreated = (loginToAuth) =>{
        const findUser = registeredUsers.find((user) => user.login.toLowerCase() == loginToAuth.toLowerCase().trim()) ?? false
        return findUser;
    }

    const logout = useCallback(() => setUser(null), [])

    const register = useCallback((login, password) => {
        const newUser = {
            id: crypto?.randomUUID() ?? Date.now().toString(),
            login: login,
            password: password,
        }
        setRegisteredUsers((prev) => [...prev, newUser]);
        return newUser;
    }, [])

    useEffect(() => {
        saveItems("users", registeredUsers)
    }, [registeredUsers])

    useEffect(() => {
        saveItems('activeUser', user)
    }, [user])

    console.log(isAuth)
    console.log("Сработал useeffect на изменение registered users", JSON.parse(localStorage.getItem('users')))

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
            }}>
            {children}
        </UserContext.Provider>
    )
}