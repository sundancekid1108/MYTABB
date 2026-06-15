import React, { Fragment, useState, useRef, useEffect } from 'react';
import {
    Disclosure, DisclosureButton, DisclosurePanel,
    Menu, MenuButton, MenuItem, MenuItems, Transition
} from '@headlessui/react';
import {
    ChevronDownIcon, EllipsisVerticalIcon, CheckIcon, XMarkIcon
} from '@heroicons/react/24/outline';
import TabCard from "../TabCard/TabCard.jsx";
import useBookmarkStore from "../../utils/zustand/bookmarkstore.js";


const BookmarkSection = (props) => {
   const {folderId, title, cards, defaultOpen = true } = props
    const inputRef = useRef(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(title);
    const {deleteBookmarkFolder, updateBookmarkFolderTitle} = useBookmarkStore()

    const handleDelete =  async(id) => {
        console.log(id)
        await deleteBookmarkFolder(id)

    }

    const handleCancelEdit = () => {

        setIsEditing(false);
    };

    const handleSaveTitle =async () => {
        console.log("handleSaveTitle")
        await updateBookmarkFolderTitle(folderId, editTitle)
        setIsEditing(false);
    }

    return (
        <div className="mb-4">
            <Disclosure defaultOpen={defaultOpen}>
                {({ open }) => (
                    <>

                        <div className="flex items-center justify-between group border-b border-gray-800 pb-2 mb-4">

                            {isEditing ? (

                                <div className="flex items-center gap-2 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSaveTitle();
                                            if (e.key === 'Escape') handleCancelEdit();
                                        }}
                                        className="bg-[#2d2d3a] text-white text-sm font-bold px-2 py-1 rounded border border-blue-500 focus:outline-none w-full"
                                    />
                                    <button
                                        onClick={handleSaveTitle}
                                        className="p-1 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors"
                                        title="저장"
                                    >
                                        <CheckIcon className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="p-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors"
                                        title="취소"
                                    >
                                        <XMarkIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (

                                <DisclosureButton className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors focus:outline-none">
                                    <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${open ? '' : '-rotate-90'}`} />
                                    <h2 className="text-sm font-bold tracking-wider text-white normal-case">{title}</h2>
                                    <span className="text-xs opacity-50 font-normal">({cards.length})</span>
                                </DisclosureButton>
                            )}

                            {!isEditing && (
                                <Menu as="div" className="relative inline-block text-left opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MenuButton className="p-1 hover:bg-gray-800 rounded text-gray-500 hover:text-white">
                                        <EllipsisVerticalIcon className="w-5 h-5" />
                                    </MenuButton>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-700 rounded-md bg-[#2d2d3a] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                            <div className="px-1 py-1">
                                                <MenuItem>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() => setIsEditing(true)}
                                                            className={`${active ? 'bg-blue-600 text-white' : 'text-gray-300'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                        >
                                                            EDIT TITLE
                                                        </button>
                                                    )}
                                                </MenuItem>
                                                <MenuItem>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() => handleDelete(folderId)}
                                                            className={`${active ? 'bg-red-600 text-white' : 'text-gray-300'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                        >
                                                            DELETE
                                                        </button>
                                                    )}
                                                </MenuItem>
                                            </div>
                                        </MenuItems>
                                    </Transition>
                                </Menu>
                            )}
                        </div>


                        <DisclosurePanel static={isEditing || undefined} className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 pb-6">
                            {cards.length > 0 ? (
                                cards.map((card, idx) => <TabCard key={idx} {...card} />)
                            ) : (
                                <div className="col-span-full border-2 border-dashed border-gray-800 rounded-lg p-8 text-center text-gray-600 text-sm">
                                    No items
                                </div>
                            )}
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>
        </div>
    )




}

export default BookmarkSection;