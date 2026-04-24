import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const TabItem = ({ tab, isSelected, onToggleSelect, onSwitch, onClose }) => {
    return (
        <div
            onClick={() => onSwitch(tab.id, tab.windowId)}
            className={`group flex items-center justify-between p-1.5 px-2 rounded-md transition-all cursor-pointer
            ${isSelected ? 'bg-[#2d2d3a] ring-1 ring-blue-500/30' : 'hover:bg-[#2d2d3a]'}`}
        >
            <div className="flex items-center gap-2 overflow-hidden flex-1">
                <div
                    className="w-4 h-4 shrink-0 relative flex items-center justify-center"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleSelect(tab);
                    }}
                >
                    <div className={`transition-opacity ${isSelected ? 'opacity-0' : 'group-hover:opacity-0 opacity-100'}`}>
                        {tab.favIconUrl ? (
                            <img
                                src={tab.favIconUrl}
                                alt=""
                                className="w-full h-full object-contain rounded-sm"
                                onError={(e) => { e.target.style.opacity = 0; }} // 에러 시 투명하게
                            />
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
                    onClose(tab.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-gray-700 rounded text-gray-500 hover:text-red-400 transition-all"
            >
                <XMarkIcon className="w-4 h-4" />
            </button>
        </div>
    )

}

export default TabItem;
