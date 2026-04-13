import React, { useState, useRef, useEffect } from 'react';
import {
    PlusIcon,
    MagnifyingGlassIcon,
    TagIcon,
    Squares2X2Icon,
    ListBulletIcon,
    ArrowsUpDownIcon,
    ChevronDoubleDownIcon,
    ChevronDoubleUpIcon,
    ChevronDownIcon,
    CheckIcon,
    CalendarDaysIcon,ArrowsRightLeftIcon,

    XMarkIcon
} from '@heroicons/react/24/outline';
import CollectionSection from "../CollectionSection/CollectionSection.jsx";
import AddCollection from '../AddCollection/AddCollection.jsx'
import useCollectionStore from "../../utils/zustand/collectionstore.js";

const CollectionGroup = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [reorderMode, setReorderMode] = useState('DRAG & DROP');
    const [selectedTags, setSelectedTags] = useState([]);

    const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
    const [isReorderDropdownOpen, setIsReorderDropdownOpen] = useState(false);
    const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);


    const [isCreating, setIsCreating] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const inputRef = useRef(null);


    const tagRef = useRef(null);
    const reorderRef = useRef(null);
    const viewRef = useRef(null);

    const { collections, addCollection,initializeCollection } = useCollectionStore();


    const availableTags = ["Work", "Personal", "Design", "Dev", "Shopping", "Research"];

    useEffect(() => {
        initializeCollection();
        console.log("collections", collections)
    }, [initializeCollection]);

    useEffect(() => {
        if (isCreating && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isCreating]);





    const handleCreate = () => {
        if (newTitle.trim()) {
            addCollection(newTitle);
            setNewTitle("");
            setIsCreating(false);
        }
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tagRef.current && !tagRef.current.contains(event.target)) setIsTagDropdownOpen(false);
            if (reorderRef.current && !reorderRef.current.contains(event.target)) setIsReorderDropdownOpen(false);
            if (viewRef.current && !viewRef.current.contains(event.target)) setIsViewDropdownOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleTag = (tag) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

 
    const buttonBaseClass = "flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-bold transition-all active:scale-95 shadow-sm";

    return (
        <div className="min-h-screen bg-[#1e1e26] text-white p-8 font-sans">
            <header className="flex items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-gray-100">My Collections</h1>
                <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                    {collections.length} Total
                </span>
            </header>

            <section className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#25252f]/50 p-3 rounded-2xl border border-gray-800/50 backdrop-blur-sm shadow-xl relative z-30">
                <div className="flex items-center gap-3">

                    <div className="relative group">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Filter collections..."
                            className="bg-[#1e1e26] border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-sm w-60 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600 font-medium"
                        />
                    </div>


                    <div className="relative" ref={tagRef}>
                        <button
                            onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                            className={`${buttonBaseClass} ${
                                isTagDropdownOpen || selectedTags.length > 0
                                    ? 'bg-gray-800 border-gray-600 text-white'
                                    : 'bg-[#1e1e26] border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800'
                            }`}
                        >
                            <TagIcon className="w-4 h-4" />
                            <span>TAGS</span>
                            {selectedTags.length > 0 && (
                                <span className="ml-1 bg-blue-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black">
                                    {selectedTags.length}
                                </span>
                            )}
                            <ChevronDownIcon className={`w-3.5 h-3.5 ml-1 transition-transform ${isTagDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isTagDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-[#1e1e26] border border-gray-800 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-1">
                                <div className="px-3 py-1 mb-1 border-b border-gray-800/50 flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-gray-500 uppercase">Filter by Tags</span>
                                    {selectedTags.length > 0 && (
                                        <button onClick={() => setSelectedTags([])} className="text-[10px] text-blue-400 hover:underline">Clear</button>
                                    )}
                                </div>
                                <div className="max-h-60 overflow-y-auto">
                                    {availableTags.map((tag) => (
                                        <button key={tag} onClick={() => toggleTag(tag)} className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
                                            <span>{tag}</span>
                                            {selectedTags.includes(tag) && <CheckIcon className="w-4 h-4 text-blue-500" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>


                    <div className="relative" ref={reorderRef}>
                        <button
                            onClick={() => setIsReorderDropdownOpen(!isReorderDropdownOpen)}
                            className={`${buttonBaseClass} ${
                                isReorderDropdownOpen
                                    ? 'bg-blue-600/20 border-blue-500/50 text-blue-400'
                                    : 'bg-[#1e1e26] border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800'
                            }`}
                        >
                            <ArrowsUpDownIcon className="w-4 h-4" />
                            <span className="min-w-[100px] text-left uppercase">{reorderMode}</span>
                            <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform ${isReorderDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isReorderDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-[#1e1e26] border border-gray-800 rounded-xl shadow-2xl py-1 z-50 animate-in fade-in slide-in-from-top-1">
                                {['DRAG & DROP', 'DATE CREATED', 'ALPHABETICAL'].map((mode) => (
                                    <button
                                        key={mode}
                                        onClick={() => { setReorderMode(mode); setIsReorderDropdownOpen(false); }}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold transition-colors ${reorderMode === mode ? 'text-blue-400 bg-blue-500/5' : 'text-gray-500 hover:bg-gray-800 hover:text-white'}`}
                                    >
                                        {mode === 'DRAG & DROP' ? <ArrowsRightLeftIcon className="w-4 h-4" /> : <CalendarDaysIcon className="w-4 h-4" />}
                                        {mode}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-4">

                    <div className="flex items-center gap-1 bg-[#1e1e26] p-1 rounded-xl border border-gray-800">
                        <button className="flex items-center gap-1.5 px-4 py-1.5 text-[11px] font-bold text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-all uppercase tracking-wider active:scale-95">
                            <ChevronDoubleDownIcon className="w-3.5 h-3.5" /> EXPAND
                        </button>
                        <div className="w-[1px] h-3 bg-gray-800" />
                        <button className="flex items-center gap-1.5 px-4 py-1.5 text-[11px] font-bold text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-all uppercase tracking-wider active:scale-95">
                            <ChevronDoubleUpIcon className="w-3.5 h-3.5" /> COLLAPSE
                        </button>
                    </div>


                    <div className="relative" ref={viewRef}>
                        <button
                            onClick={() => setIsViewDropdownOpen(!isViewDropdownOpen)}
                            className={`${buttonBaseClass} bg-[#1e1e26] min-w-[140px] justify-center ${
                                isViewDropdownOpen ? 'border-gray-600 text-white' : 'border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800'
                            }`}
                        >
                            <div className="flex items-center gap-2.5 flex-1 justify-start uppercase tracking-wide">
                                {viewMode === 'grid' ? <Squares2X2Icon className="w-5 h-5 text-blue-400" /> : <ListBulletIcon className="w-5 h-5 text-blue-400" />}
                                <span>{viewMode === 'grid' ? 'CARD' : 'LIST'}</span>
                            </div>
                            <ChevronDownIcon className={`w-3.5 h-3.5 text-gray-500 transition-transform ${isViewDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isViewDropdownOpen && (
                            <div className="absolute top-full right-0 mt-2 w-36 bg-[#1e1e26] border border-gray-800 rounded-xl shadow-2xl overflow-hidden py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
                                <button onClick={() => { setViewMode('grid'); setIsViewDropdownOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold transition-colors ${viewMode === 'grid' ? 'text-blue-400 bg-blue-500/10' : 'text-gray-500 hover:bg-gray-800 hover:text-white'}`}>
                                    <Squares2X2Icon className="w-4 h-4" /> CARD VIEW
                                </button>
                                <button onClick={() => { setViewMode('list'); setIsViewDropdownOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold transition-colors ${viewMode === 'list' ? 'text-blue-400 bg-blue-500/10' : 'text-gray-500 hover:bg-gray-800 hover:text-white'}`}>
                                    <ListBulletIcon className="w-4 h-4" /> LIST VIEW
                                </button>
                            </div>
                        )}
                    </div>


                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold transition-all shadow-lg shadow-blue-600/30 active:scale-95 border border-transparent"
                            onClick={() => setIsCreating(true)}>
                        <PlusIcon className="w-5 h-5" strokeWidth={3} />
                        <span className="shrink-0 uppercase">ADD COLLECTION</span>
                    </button>
                </div>
            </section>

            <main className="mx-auto">

                {isCreating && (
                  <AddCollection
                      onSave={(title) => {
                          addCollection(title);
                          setIsCreating(false);
                      }}
                      onCancel={() => setIsCreating(false)}
                  />
                )}

                {collections.map((col, index) => (
                    <CollectionSection key={index} title={col.title} cards={col.cards} />
                ))}
            </main>
        </div>
    );
};

export default CollectionGroup;