import { create } from 'zustand';

const MAX_CARDS = 200;

import {loadCollections, saveCollections} from '../chromeapi/storage.js'


const useCollectionStore = create((set,get) => ({
    collections: [],

    initializeCollection: async () => {
        const data = await loadCollections();
        set({ collections: data });
    },


    addCollection: (title) => {
        const trimmed = title?.trim();
        if (!trimmed) return;

        set((state) => {
            const newCol = {
                id: crypto.randomUUID(),
                title: trimmed,
                tags: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                cards: []
            };
            return { collections: [newCol, ...state.collections] };
        });

        saveCollections(get().collections);   // 자동 저장
    },
    removeCollection: (id) => {
        set((state) => ({
            collections: state.collections.filter(c => c.id !== id)
        }));
        saveCollections(get().collections);
    },


}))

export default useCollectionStore