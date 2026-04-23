import React, { useMemo } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import {
    XMarkIcon,
    ChevronDownIcon,
    ArrowDownOnSquareIcon
} from '@heroicons/react/24/outline';
import useTabStore from "../../utils/zustand/tabstore.js";

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
                            <Disclosure key={windowId} defaultOpen={true}>
                                {({ open }) => (
                                    <div className="mb-2">

                                        <div className="flex items-center justify-between group px-2 py-1.5 hover:bg-[#25252f] rounded-md transition-colors">
                                            <Disclosure.Button className="flex items-center gap-2 flex-1 text-left focus:outline-none">
                                                <span className="text-[11px] font-bold text-gray-500 ">Window {index + 1}</span>

                                                <ChevronDownIcon
                                                    className={`w-3.5 h-3.5 text-gray-600 transition-transform duration-200 ${open ? '' : '-rotate-90'}`}
                                                />
                                            </Disclosure.Button>


                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1 hover:bg-gray-700 rounded text-gray-500 hover:text-blue-400" title="Save Window">

                                                    <ArrowDownOnSquareIcon className="w-4 h-4" />
                                                </button>
                                                <button className="p-1 hover:bg-gray-700 rounded text-gray-500 hover:text-white">
                                                    <XMarkIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>


                                        <Transition
                                            show={open}
                                            enter="transition duration-100 ease-out"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="transition duration-75 ease-out"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Disclosure.Panel className="mt-1 space-y-0.5">
                                                {tabsByWindow[windowId].map((tab) => {
                                                    const isSelected = selectedTabs.some((s) => s.id === tab.id);

                                                    return (
                                                        <div
                                                            key={tab.id}
                                                            onClick={() => onSwitchTab(tab.id, tab.windowId)}
                                                            className={`group flex items-center justify-between p-1.5 px-2 rounded-md transition-all cursor-pointer
                                                            ${isSelected ? 'bg-[#2d2d3a] ring-1 ring-blue-500/30' : 'hover:bg-[#2d2d3a]'}`}
                                                        >
                                                            <div className="flex items-center gap-2 overflow-hidden flex-1">
                                                                <div
                                                                    className="w-4 h-4 shrink-0 relative flex items-center justify-center"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        toggleSelectTab(tab);
                                                                    }}
                                                                >
                                                                    <div className={`transition-opacity ${isSelected ? 'opacity-0' : 'group-hover:opacity-0 opacity-100'}`}>
                                                                        {tab.favIconUrl ? (
                                                                            <img src={tab.favIconUrl} alt="" className="w-full h-full object-contain rounded-sm" />
                                                                        ) : (
                                                                            <div className="w-full h-full bg-gray-700 rounded-sm" />
                                                                        )}
                                                                    </div>
                                                                    <input
                                                                        type="checkbox"
                                                                        readOnly
                                                                        checked={isSelected}
                                                                        className={`absolute inset-0 w-3.5 h-3.5 mt-0.5 ml-0.5 cursor-pointer accent-blue-500 transition-opacity
                                                                        ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                                                                    />
                                                                </div>

                                                                <p className={`text-[12px] truncate leading-none transition-colors
                                                                ${isSelected ? 'text-blue-400 font-medium' : 'text-gray-300'}`}>
                                                                    {tab.title}
                                                                </p>
                                                            </div>

                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    closeTab(tab.id);
                                                                }}
                                                                className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-gray-700 rounded text-gray-500 hover:text-red-400 transition-all"
                                                            >
                                                                <XMarkIcon className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </Disclosure.Panel>
                                        </Transition>
                                    </div>
                                )}
                            </Disclosure>
                        )
                    )) : (
                    <div className="text-center text-gray-600 mt-20 text-[11px] font-medium">
                        No active tabs
                    </div>
                )}
            </div>
        </aside>
    );
};

export default RightSidebar;