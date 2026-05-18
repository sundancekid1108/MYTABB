import { create } from 'zustand';

import {getAllBookmarks, addUrlToBookmarkFolder, createBookmarkFolder, getBookmarkFolders ,deleteBookmarkFolder} from '../chromeapi/chromeapi.js'

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
                    // node.id0, 1, 2는 제외(북마크바, 기타북마크바)
                    if (node.id !== '0' && node.id !== '1' && node.id !== '2') {
                        folders.push({
                            id: node.id,
                            title: node.title
                        });

                        const links = node.children ? node.children.filter(child => child.url) : [];
                        sections.push({
                            id: node.id,
                            title: node.title,
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
    },

    addBookmarkFolder: async (title) => {
        try {
            await createBookmarkFolder(title);
            await get().initializeBookmarkSection();
        } catch (error) {
            console.error(error);
        }
    },

    deleteBookmarkFolder: async (folderId) => {
        try {
            if(folderId === '1') {
                console.log(folderId)
            console.log("!")
            } else {
                await deleteBookmarkFolder(folderId);
                await get().initializeBookmarkSection();
            }


        } catch (error) {
            console.error(error);
        }
    }


}))

export  default useBookmarkStore;