import React, { useState, useEffect } from 'react';
import {
    LinkIcon,
    ClipboardDocumentIcon,
    CheckIcon,
    ChevronDownIcon,
    FolderIcon,
    ArrowDownTrayIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

import {getCurrentTabInfo} from '../../utils/chromeapi/chromeapi.js'

const Popup = () => {
    const [tabInfo, setTabInfo] = useState({ title: '', url: '' });
    const [selectedCollection, setSelectedCollection] = useState('Default');
    const [isCreating, setIsCreating] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    const collections = ['Work', 'Design', 'Reading', 'Inspiration'];


    useEffect(() => {

        const initPopup = async () => {
            setIsLoading(true);
            try {
                const info = await getCurrentTabInfo();
                setTabInfo(info);
            } finally {

                setIsLoading(false)
            }
        };
        initPopup();


    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(tabInfo.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSaveTab = () => {
        console.log("Saving to collection:", {
            ...tabInfo,
            collection: selectedCollection
        });
        alert(`${selectedCollection} 컬렉션에 추가되었습니다! `);
        window.close();
    };

    const handleClosePopup = () => {
        window.close();
    };

    return (
        <div className="w-[380px] p-5 bg-[#121214] text-white font-sans select-none">
            <header className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-xs">M</div>
                    <h1 className="text-lg font-bold tracking-tight">MyTabb</h1>
                </div>
                <button
                    onClick={handleClosePopup}
                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors group"
                >
                    <XMarkIcon className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                </button>
            </header>

            <div className="space-y-4">
                {isLoading ? <div>Loading...</div> :
                    <div className="bg-[#1c1c1f] border border-gray-800 rounded-2xl p-4 space-y-4 animate-in fade-in slide-in-from-top-2">

                        <div>
                            <p className="text-[10px] font-bold text-indigo-400  tracking-widest mb-1.5 ml-1">Page Title</p>
                            <input
                                type="text"
                                value={tabInfo.title}
                                onChange={(e) => setTabInfo({...tabInfo, title: e.target.value})}
                                className="w-full bg-[#121214] border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 transition-colors"
                                placeholder="제목을 입력하세요"
                            />
                        </div>


                        <div>
                            <p className="text-[10px] font-bold text-indigo-400  tracking-widest mb-1.5 ml-1">URL Address</p>
                            <div className="flex items-center gap-2 bg-[#121214] p-2.5 rounded-lg border border-gray-800">
                                <span className="text-[11px] text-gray-500 truncate flex-1 font-mono italic">
                                    {tabInfo.url}
                                </span>
                                <button
                                    onClick={copyToClipboard}
                                    className="p-1.5 hover:bg-gray-800 rounded-md transition-colors text-gray-500 hover:text-white"
                                >
                                    {copied ? <CheckIcon className="w-4 h-4 text-green-500" /> : <ClipboardDocumentIcon className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>


                        <div>
                            <p className="text-[10px] font-bold text-indigo-400  tracking-widest mb-1.5 ml-1">Select Collection</p>
                            <div className="relative">
                                <FolderIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <select
                                    value={selectedCollection}
                                    onChange={(e) => setSelectedCollection(e.target.value)}
                                    className="w-full bg-[#121214] border border-gray-800 rounded-lg pl-9 pr-10 py-2.5 text-sm text-gray-200 appearance-none focus:outline-none focus:border-indigo-500 cursor-pointer"
                                >
                                    <option value="Default">Default Collection</option>
                                    {collections.map(item => (
                                        <option key={item} value={item}>{item}</option>
                                    ))}
                                </select>
                                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                            </div>
                        </div>


                        <button
                            onClick={handleSaveTab}
                            className="w-full bg-white hover:bg-gray-200 text-black py-3 rounded-xl font-black text-xs transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
                        >
                            <ArrowDownTrayIcon className="w-4 h-4" />
                            ADD TO COLLECTION
                        </button>
                    </div>
                }


            </div>


        </div>
    );
};

export default Popup;