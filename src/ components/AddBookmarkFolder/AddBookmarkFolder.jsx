import React, { Fragment, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon, XMarkIcon, CheckIcon, TagIcon, PlusIcon } from "@heroicons/react/24/outline";

import useBookmarkStore  from "../../utils/zustand/bookmarkstore.js"


const AddBookmarkFolder = (props) => {
    const { onSave, onCancel } = props
    const [isLoading, setIsLoading] = useState(false);

    const {createBookmarkFolder} = useBookmarkStore();

    const { register, handleSubmit, watch, formState: { isValid } } = useForm({
        defaultValues: {
            title: ""
        },
        mode: "onChange"
    });


    const onSubmit = async (data) => {
        const trimmedTitle = data.title.trim();
        try {
            setIsLoading(true);
            await createBookmarkFolder(trimmedTitle);
            onSave()
        } catch (error) {
            console.error("북마크 폴더 생성 실패:", error);
        }finally {
            setIsLoading(false);
        }
    }




    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            onCancel();
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-10 bg-[#25252f]/30 p-6 rounded-2xl border border-blue-500/30 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300"
        >
            <div className="flex items-center justify-between group border-b border-gray-800 pb-4 mb-6">
                <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                        <TagIcon className="w-5 h-5 text-blue-400" />
                    </div>

                    <input
                        type="text"
                        placeholder="BOOKMARK FOLDER TITLE"
                        className="bg-transparent text-xl font-bold tracking-wider text-white placeholder:text-gray-600 outline-none w-full"
                        onKeyDown={handleKeyDown}
                        {...register("title", {
                            required: true,
                            validate: (value) => value.trim() !== "",
                            autoFocus: true
                        })}
                    />
                </div>

                <div className="flex items-center gap-2">

                    <button
                        type="submit"
                        disabled={!isValid || isLoading}
                        className={`p-2 rounded-lg transition-all ${isValid ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-gray-800 text-gray-600 cursor-not-allowed'}`}
                    >
                        <CheckIcon className="w-5 h-5" strokeWidth={3} />
                    </button>

                    <Menu as="div" className="relative inline-block text-left">
                        <MenuButton className="p-2 hover:bg-gray-800 rounded-lg text-gray-500 hover:text-white transition-colors">
                            <EllipsisVerticalIcon className="w-5 h-5" />
                        </MenuButton>


                        <MenuItems
                            transition
                            className="absolute right-0 mt-2 w-40 origin-top-right bg-[#1e1e26] border border-gray-800 rounded-xl shadow-2xl py-1 z-50 focus:outline-none transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
                        >
                            <MenuItem>
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="text-gray-400 data-[focus]:bg-red-500/10 data-[focus]:text-red-400 group flex w-full items-center px-4 py-2.5 text-xs font-bold"
                                >
                                    <XMarkIcon className="w-4 h-4 mr-2" /> CANCEL
                                </button>
                            </MenuItem>
                        </MenuItems>
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
        </form>
    );
};

export default AddBookmarkFolder;