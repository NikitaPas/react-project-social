const useLocaleStorage = () => {
    const getItems = (key, defaultValue) => {
        const savedItems = localStorage.getItem(key)
        if (savedItems) {
            return JSON.parse(savedItems);
        }
        else {
            return defaultValue;
        }
    }

    const saveItems = (key, items) => {
        localStorage.setItem(key, JSON.stringify(items));
    }

    return {
        getItems,
        saveItems,
    }
}

export default useLocaleStorage