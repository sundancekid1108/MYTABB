import { create } from 'zustand';

import {getAllBookmarks, addUrlToBookmarkFolder, createBookmarkFolder, getBookmarkFolders} from '../chromeapi/chromeapi.js'

const useBookmarkStore = create((set,get) => ({
    bookmarkTree: [],
    bookmarkSections: [],
    bookmarkFolders: [],

    isLoading: false,
    initializeBookmarkSection: async () => {
        set({ isLoading: true });
        const tree = await getAllBookmarks();
        // console.log("tree", tree);

        const sections = [];
        const folders = [];
        const convertBookmarkData = (nodes) => {

            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];

                if (!node.url) {
                    if (node.id !== '0') {
                        folders.push({
                            id: node.id,
                            title: node.title || (node.id === '1' ? "북마크바" : "기타 즐겨찾기")
                        });
                        
                        const links = node.children ? node.children.filter(child => child.url) : [];
                        sections.push({
                            id: node.id,
                            title: node.title || (node.id === '1' ? "북마크바" : "기타 즐겨찾기"),
                            cards: links.map(link => ({
                                id: link.id,
                                title: link.title,
                                url: link.url,
                            }))
                        });
                    }
                    if (node.children) convertBookmarkData(node.children);
                }
            }
        };

        if (tree) {
            convertBookmarkData(tree);
        }
        set({ bookmarkTree: tree, bookmarkSections: sections, bookmarkFolders: folders, isLoading: false });
    },

    addSelectedTabsToBookmarkFolder: async (selectedTabs, parentId) => {
        try {
            const promises = selectedTabs.map((tab) =>
                addUrlToBookmarkFolder(tab.title, tab.url, parentId)
            );
            await Promise.all(promises);
            await get().initializeBookmarkSection();
            return
        } catch (error){
            console.error(error);
        }
    }


}))

export  default useBookmarkStore;