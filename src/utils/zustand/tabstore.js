import { create } from 'zustand';
import { getWindowsInfo} from '../chromeapi/chromeapi.js'



const useTabStore = create((set, get) => ({
    openTabs: [],
    selectedTabs: [],
    isModalOpen: false,

    fetchTabs: async () => {
        if (typeof chrome !== 'undefined' && chrome.windows) {
            const windows = await getWindowsInfo();
            const allTabs = windows.flatMap(window => window.tabs || []);
            const filteredTabs = allTabs.filter(tab =>
                tab.url && !tab.url.startsWith('chrome://newtab')
            );
            set({ openTabs: filteredTabs });
        }
    },

    onSwitchTab: async (tabId, windowId) => {
        if (typeof chrome !== 'undefined' && chrome.tabs) {
            await chrome.windows.update(windowId, { focused: true });
            await chrome.tabs.update(tabId, { active: true });
        }
    },

    toggleSelectTab: (tab) => {
        set((state) => {
            const isSelected = state.selectedTabs.some(t => t.id === tab.id);
            const nextSelected = isSelected
                ? state.selectedTabs.filter(t => t.id !== tab.id)
                : [...state.selectedTabs, tab];

            return {
                selectedTabs: nextSelected,

                isModalOpen: nextSelected.length > 0
            };
        });
    },
    closeTab: (tabId) => {
        if (typeof chrome !== "undefined" && chrome.tabs) {
            chrome.tabs.remove(tabId, () => {
                console.log(`Tab ${tabId} closed`);
            });

            set((state) => {
                // 선택된 탭 목록에서 해당 탭 제거
                const nextSelected = state.selectedTabs.filter((tab) => tab.id !== tabId);

                // 전체 탭 목록에서 해당 탭 제거
                const nextOpenTabs = state.openTabs.filter((tab) => tab.id !== tabId);

                return {
                    openTabs: nextOpenTabs,
                    selectedTabs: nextSelected,


                };
            });
        }
    },

    clearSelectedTabs: () => set({ selectedTabs: [], }),







}))

export default useTabStore;