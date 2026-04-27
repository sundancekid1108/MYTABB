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

            return result
        }




    } catch (error) {
        console.error("Failed to get bookmarks tree:", error);
        return [];
    }
};

const createBookmarkFolder = async (title) => {
    try {

        //   parentId 1 => 북마크바, 2 => 기타 북마크
        await chrome.bookmarks.create({
            parentId: "1",
            title: title
        });

    } catch (error) {
        console.log("북마크 폴더 생성 실패", error )
    }
}



export { getWindowsInfo, getCurrentTabInfo, getAllBookmarks, createBookmarkFolder }