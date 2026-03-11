import { useCallback } from "react";

const useLocaleStorage = () => {
    const getItems = useCallback(<T>(key: string, defaultValue: T): T => {
        const savedItems = localStorage.getItem(key)
        if (savedItems) {
            return JSON.parse(savedItems);
        }
        else {
            return defaultValue;
        }
    }, []);

    const saveItems = useCallback(<T>(key: string, items: T): void => {
        localStorage.setItem(key, JSON.stringify(items));
    }, []);

    return {
        getItems,
        saveItems,
    }
}

export default useLocaleStorage