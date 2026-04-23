import { create } from 'zustand';

import {getAllBookmarks} from '../chromeapi/chromeapi.js'

const useBookmarkStore = create((set,get) => ({
    bookmarkTree: [],
    initializeBookmark: async () => {
        const result = await getAllBookmarks();
        console.log("result[0]", result[0].children);
        set({bookmarkTree: result})
    }
}))

export  default useBookmarkStore;