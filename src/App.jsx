import { useState, useEffect } from 'react';
import RightSidebar from "./ components/RightSidebar/RightSidebar.jsx";
import LeftSidebar from "./ components/LeftSidebar/LeftSidebar.jsx";
import BookmarkGroup from './ components/BookmarkGroup/BookmarkGroup.jsx'
import useTabStore from './utils/zustand/tabstore.js'
import Modal from "./ components/Modal/Modal.jsx";

const App = () => {

	const [activeMenu, setActiveMenu] = useState("Collections");


	const {
		openTabs,
		selectedTabs,
		fetchTabs,
		closeTab,
		onSwitchTab,
		toggleSelectTab,

	} = useTabStore();

	useEffect(() => {

		fetchTabs();

		if (typeof chrome !== "undefined" && chrome.tabs) {
			const handleTabChange = () => fetchTabs();
			const handleTabUpdate = (tabId, changeInfo) => {
				if (changeInfo.status === "complete" || changeInfo.url || changeInfo.title) {
					fetchTabs();
				}
			};

			chrome.tabs.onCreated.addListener(handleTabChange);
			chrome.tabs.onRemoved.addListener(handleTabChange);
			chrome.tabs.onMoved.addListener(handleTabChange);
			chrome.tabs.onUpdated.addListener(handleTabUpdate);

			return () => {
				chrome.tabs.onCreated.removeListener(handleTabChange);
				chrome.tabs.onRemoved.removeListener(handleTabChange);
				chrome.tabs.onMoved.removeListener(handleTabChange);
				chrome.tabs.onUpdated.removeListener(handleTabUpdate);
			};
		}
	}, [fetchTabs]);

	return (
		<div className="flex h-screen w-screen bg-[#1e1e26] text-white font-sans overflow-hidden selection:bg-blue-500/30 uppercase">


			<LeftSidebar
				activeMenu={activeMenu}
				setActiveMenu={setActiveMenu}
			/>


			<main className="flex-1 flex flex-col min-w-0 h-full bg-[#1e1e26] overflow-hidden">
				<BookmarkGroup />
			</main>


			<div className="flex flex-shrink-0 h-full border-l border-gray-800 shadow-2xl">
				<RightSidebar
					openTabs={openTabs}
					selectedTabs={selectedTabs}
					onToggleSelectedTab={toggleSelectTab}
					onCloseTab={closeTab}
					onSwitchTab={onSwitchTab}
				/>
			</div>


			<Modal />
		</div>
	);
}

export default App;