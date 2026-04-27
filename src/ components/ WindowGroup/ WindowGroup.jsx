import React from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon, ArrowDownOnSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import TabItem  from "../TabItem/TabItem.jsx";


const  WindowGroup = ( { index, tabs, selectedTabs, actions } ) => {

    return (
        <Disclosure defaultOpen={true}>
            {({open}) => (
                <div className="mb-2">
                    <div className="flex items-center justify-between group px-2 py-1.5 hover:bg-[#25252f] rounded-md transition-colors">
                        <Disclosure.Button className="flex items-center gap-2 flex-1 text-left focus:outline-none">
                            <span className="text-[11px] font-bold text-gray-500 ">WINDOW {index + 1}</span>
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
                            {tabs.map((tab) => (
                                <TabItem
                                    key={tab.id}
                                    tab={tab}
                                    isSelected={selectedTabs.some((s) => s.id === tab.id)}
                                    onToggleSelect={actions.toggleSelectTab}
                                    onSwitch={actions.onSwitchTab}
                                    onClose={actions.closeTab}
                                />
                            ))}
                        </Disclosure.Panel>
                    </Transition>
                </div>
            )}

        </Disclosure>
        )

}

export default WindowGroup;