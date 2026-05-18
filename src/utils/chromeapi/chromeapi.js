const getWindowsInfo =  async () => {
    try {
        const windows = await chrome.windows.getAll({ populate: true });
        // console.log("windows", windows);

        return windows || [];

    } catch (error) {
        console.error("창 정보를 가져오는 중 오류 발생:", error);
        return []
    }
}

const getCurrentTabInfo = async () => {
    try {
        if (typeof chrome !== "undefined" && chrome.tabs) {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab) {
                return {
                    title: tab.title || '',
                    url: tab.url || ''
                };
            }
        }


    } catch (error) {
        console.error("탭 정보를 가져오는 중 오류 발생:", error);
        return { title: '', url: '' };
    }
};

const getAllBookmarks = async () => {
    try {
        if (typeof chrome !== "undefined" && chrome.tabs) {
            const result = await chrome.bookmarks.getTree();

            // console.log("getAllBookmarks result", result)
            return result
        }


    } catch (error) {
        console.error("북마크 가져오기 실패");
        return [];
    }
};

const getBookmarkFolders = async () => {
    try {
        if (typeof chrome !== "undefined" && chrome.bookmarks) {
            const tree = await chrome.bookmarks.getTree();
            const folderList = [];


            const findFolders = (nodes) => {
                for (let i = 0; i < nodes.length; i++) {
                    const node = nodes[i]
                    if (!node.url) {

                        folderList.push({
                            id: node.id,
                            title: node.title || (node.id === "0" ? "Root" : "이름 없는 폴더")
                        });

                        if (node.children) {
                            findFolders(node.children);
                        }
                    }
                }
            };

            findFolders(tree);
            return folderList;
        }
        return [];


    } catch (error) {
        console.error("폴더 목록 가져오기 실패:", error);
        return [];
    }
}


const createBookmarkFolder = async (title) => {
    try {

        //   parentId 1 => 북마크바, 2 => 기타 북마크
        await chrome.bookmarks.create({
            parentId: "1",
            title: title
        });

    } catch (error) {
        console.error("북마크 폴더 생성 실패", error )
    }
}

const addUrlToBookmarkFolder = async (title, url, parentId)=> {

        try {

            if (typeof chrome !== "undefined" && chrome.bookmarks) {
                const result = await chrome.bookmarks.create({
                    parentId: parentId,
                    title: title,
                    url: url
                });
                console.log("북마크 추가 성공:", result);
                return result;
            }
        } catch (error) {
            console.error("북마크 추가 실패:", error);
            return null;
        }
}


const deleteBookmarkFolder = async (folderId) => {
    try {
        if (typeof chrome !== "undefined" && chrome.bookmarks) {
            await chrome.bookmarks.removeTree(folderId);

            return true;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}




export { getWindowsInfo, getCurrentTabInfo, getAllBookmarks, createBookmarkFolder, addUrlToBookmarkFolder, getBookmarkFolders , deleteBookmarkFolder}