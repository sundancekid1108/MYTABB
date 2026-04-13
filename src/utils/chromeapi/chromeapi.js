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

        return {
            title: "How to Build a Chrome Extension with React and Tailwind...",
            url: "https://github.com/react-labs/extension"
        };
    } catch (error) {
        console.error("탭 정보를 가져오는 중 오류 발생:", error);
        return { title: '', url: '' };
    }
};



export { getWindowsInfo, getCurrentTabInfo }