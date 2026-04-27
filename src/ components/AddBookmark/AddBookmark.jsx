import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon, XMarkIcon, CheckIcon, TagIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useState, useEffect, useRef } from "react";
import  {createBookmarkFolder} from '../../utils/chromeapi/chromeapi.js'

const AddBookmark = ({ onSave, onCancel }) => {
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false); // 저장 중 상태 추가
    const inputRef = useRef(null);


    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    const handleSave = async () => {
        const trimmedTitle = title.trim();
        try {
            setIsLoading(true);
            await createBookmarkFolder(trimmedTitle);
            onSave()

        } catch (error) {
            console.error("북마크 폴더 생성 실패:", error);
        } finally {
            setIsLoading(false);
        }
        
    }


    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && title.trim()) {
            onSave(title);
        } else if (event.key === 'Escape') {
            onCancel();
        }
    };

    return (
        <div className="mb-10 bg-[#25252f]/30 p-6 rounded-2xl border border-blue-500/30 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">

            <div className="flex items-center justify-between group border-b border-gray-800 pb-4 mb-6">
                <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                        <TagIcon className="w-5 h-5 text-blue-400" />
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="BOOKMARK TITLE"
                        className="bg-transparent text-xl font-bold tracking-wider text-white placeholder:text-gray-600 outline-none w-full"
                    />
                </div>


                <div className="flex items-center gap-2">
                    <button
                        onClick={handleSave}
                        disabled={!title.trim() || isLoading}
                        className={`p-2 rounded-lg transition-all ${title.trim() ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-gray-800 text-gray-600 cursor-not-allowed'}`}
                    >
                        <CheckIcon className="w-5 h-5" strokeWidth={3} />
                    </button>

                    <Menu as="div" className="relative inline-block text-left">
                        <MenuButton className="p-2 hover:bg-gray-800 rounded-lg text-gray-500 hover:text-white transition-colors">
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
                            <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right bg-[#1e1e26] border border-gray-800 rounded-xl shadow-2xl py-1 z-50 focus:outline-none">
                                <MenuItem>
                                    {({ active }) => (
                                        <button
                                            onClick={onCancel}
                                            className={`${active ? 'bg-red-500/10 text-red-400' : 'text-gray-400'} group flex w-full items-center px-4 py-2.5 text-xs font-bold`}
                                        >
                                            <XMarkIcon className="w-4 h-4 mr-2" /> CANCEL
                                        </button>
                                    )}
                                </MenuItem>
                            </MenuItems>
                        </Transition>
                    </Menu>
                </div>
            </div>


            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
                <div className="col-span-full border-2 border-dashed border-gray-800/50 rounded-2xl py-12 flex flex-col items-center justify-center bg-[#1e1e26]/50 group hover:border-blue-500/30 transition-colors">
                    <div className="w-12 h-12 bg-gray-800/50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <PlusIcon className="w-6 h-6 text-gray-600 group-hover:text-blue-400" />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddBookmark;