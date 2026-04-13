
const STORAGE_KEY = 'myTabb_collections';
const MAX_CARDS = 200;

const DEFAULT_COLLECTIONS = [];


export const saveCollections = async (collections) => {
    try {
        await chrome.storage.local.set({ [STORAGE_KEY]: collections });
    } catch (error) {
        console.error("Failed to save collections:", error);
    }
};

export const loadCollections = async () => {
    try {
        const result = await chrome.storage.local.get(STORAGE_KEY);
        return result[STORAGE_KEY] || DEFAULT_COLLECTIONS;
    } catch (error) {
        console.error("Failed to load collections:", error);
        return DEFAULT_COLLECTIONS;
    }
};
