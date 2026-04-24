import React, { useMemo } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import {
    XMarkIcon,
    ChevronDownIcon,
    ArrowDownOnSquareIcon
} from '@heroicons/react/24/outline';
import useTabStore from "../../utils/zustand/tabstore.js";
import WindowGroup from "../ WindowGroup/ WindowGroup.jsx";

const TabControlIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >

        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />

        <path d="M9 4v16" />

        <path d="M15 10l-2 2l2 2" />
    </svg>
);

const RightSidebar = () => {
    const { openTabs, selectedTabs, toggleSelectTab, closeTab, onSwitchTab } = useTabStore();


    const tabsByWindow = useMemo(() => {
        const groups = {};
        openTabs.forEach((tab) => {
            if (!groups[tab.windowId]) groups[tab.windowId] = [];
            groups[tab.windowId].push(tab);
        });
        return groups;
    }, [openTabs]);

    const windowIds = Object.keys(tabsByWindow);

    return (
        <aside className="w-72 bg-[#1e1e26] border-l border-[#2d2d3a] flex flex-col flex-shrink-0 h-full overflow-hidden">

            <div className="h-14 px-4 flex justify-between items-center border-b border-gray-800/50">
                <h2 className="text-sm font-bold text-gray-400  tracking-tight">Open Tabs</h2>
                <button className="p-1.5 hover:bg-gray-800 rounded text-gray-500 hover:text-white transition-colors">
                    <TabControlIcon className="w-4 h-4" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                {windowIds.length > 0 ? (
                    windowIds.map((windowId, index) => (
                        <WindowGroup
                            key={windowId}
                            windowId={windowId}
                            index={index}
                            tabs={tabsByWindow[windowId]}
                            selectedTabs={selectedTabs}
                            actions={{ toggleSelectTab, closeTab, onSwitchTab }}
                        />
                    ))
                ) : (
                    <div className="text-center text-gray-600 mt-20 text-[11px] font-medium">
                        No active tabs
                    </div>
                )}
            </div>

        </aside>
    );
};

export default RightSidebar;