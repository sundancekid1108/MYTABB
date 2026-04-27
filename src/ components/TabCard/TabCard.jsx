import React, { useState } from 'react';
import {
    XMarkIcon,
    ShareIcon,
    DocumentDuplicateIcon,
    PencilSquareIcon,
    EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';

const TabCard = (props  ) => {
    const  {title, url,  favicon, onClose } = props
    const [isSelected, setIsSelected] = useState(false);



    return (

        <div className="group relative bg-[#2d2d3a] hover:bg-[#353545] p-3 rounded-xl border border-transparent hover:border-gray-600 transition-all cursor-pointer shadow-md flex flex-col h-full w-full max-w-[280px] mx-auto">


            <button
                type="button"
                className="absolute top-2 right-2 p-1 rounded-md text-gray-500 hover:text-white hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-all z-10"
                onClick={(e) => {
                    e.stopPropagation();
                    if (onClose) onClose();
                }}
            >
                <XMarkIcon className="w-4 h-4" strokeWidth={2.5} />
            </button>


            <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center relative">
                    <div className={`w-full h-full bg-gray-800 rounded-md overflow-hidden transition-opacity duration-200 ${
                        isSelected ? 'opacity-0' : 'group-hover:opacity-0 opacity-100'
                    }`}>
                        <img
                            src={favicon}
                            loading="lazy"
                            alt=""
                            className="w-full h-full object-contain p-0.5"

                        />
                    </div>

                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => setIsSelected(!isSelected)}
                        onClick={(e) => e.stopPropagation()}
                        className={`absolute inset-0 w-4 h-4 m-auto cursor-pointer rounded border-gray-600 bg-gray-900 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900 transition-all duration-200 ${
                            isSelected ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-100 scale-100'
                        }`}
                    />
                </div>

                <h3 className="text-sm font-semibold text-gray-100 truncate pr-6">
                    {title}
                </h3>
            </div>


            {/*<p className="text-xs text-gray-400 truncate mb-4 px-0.5">*/}
            {/*    {description}*/}
            {/*</p>*/}


            <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-1">
                <button
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-blue-600 text-gray-400 hover:text-white transition-all shadow-sm"
                    onClick={(e) => e.stopPropagation()}
                    title="Share"
                >
                    <ShareIcon className="w-4 h-4" />
                </button>

                <button
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-yellow-500 text-gray-400 hover:text-white transition-all shadow-sm"
                    onClick={(e) => e.stopPropagation()}
                    title="Duplicate"
                >
                    <DocumentDuplicateIcon className="w-4 h-4" />
                </button>

                <button
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-green-600 text-gray-400 hover:text-white transition-all shadow-sm"
                    onClick={(e) => e.stopPropagation()}
                    title="Edit"
                >
                    <PencilSquareIcon className="w-4 h-4" />
                </button>

                <button
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-gray-600 text-gray-400 hover:text-white transition-all shadow-sm"
                    onClick={(e) => e.stopPropagation()}
                    title="More"
                >
                    <EllipsisHorizontalIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default TabCard;