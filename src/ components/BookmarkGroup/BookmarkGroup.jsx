import React, {useState, useRef, useEffect, useMemo} from 'react';
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
import BookmarkSection from "../BookmarkSection/BookmarkSection.jsx";
import AddBookmark from '../AddBookmark/AddBookmark.jsx'
import useCollectionStore from "../../utils/zustand/collectionstore.js";
import useBookmarkStore from "../../utils/zustand/bookmarkstore.js";

const BookmarkGroup = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [reorderMode, setReorderMode] = useState('DRAG & DROP');
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreating, setIsCreating] = useState(false);


    // 드롭다운
    const [isReorderDropdownOpen, setIsReorderDropdownOpen] = useState(false);
    const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);

    const inputRef = useRef(null);


    const tagRef = useRef(null);
    const reorderRef = useRef(null);
    const viewRef = useRef(null);

    const {bookmarkTree, initializeBookmark} = useBookmarkStore();

    useEffect(() => {
        initializeBookmark()
        console.log("bookmarkTree", bookmarkTree)
        // console.log("collections", collections)
    }, [initializeBookmark]);


    useEffect(() => {
        if (isCreating && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isCreating]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tagRef.current && !tagRef.current.contains(event.target)) setIsTagDropdownOpen(false);
            if (reorderRef.current && !reorderRef.current.contains(event.target)) setIsReorderDropdownOpen(false);
            if (viewRef.current && !viewRef.current.contains(event.target)) setIsViewDropdownOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    const bookmarkSections = useMemo(() => {
        const results = [];

        const checkBookmarkDetail = (node) => {
            // 크롬 북마크 폴더 구조
            // id: '0', 전체 폴더 들어있는 컨테이너
            // id: '1', 북마크바
            // id: '2', (기타 북마크)
            const isFolder = !node.url;

            if (isFolder) {

                if (node.id !== '0') {
                    const links = node.children ? node.children.filter(child => child.url) : [];

                    results.push({
                        id: node.id,
                        title: node.title || (node.id === '1' ? "북마크바" : "기타 즐겨찾기"),

                        cards: links.map(link => {
                           
                            const domain = new URL(link.url).hostname;
                            const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;

                            return {
                                id: link.id,
                                title: link.title,
                                url: link.url,
                                favicon: faviconUrl
                            };
                        })
                    });
                }


                if (node.children) {
                    node.children.forEach(child => {
                        if (!child.url) {
                            checkBookmarkDetail(child);
                        }
                    });
                }
            }
        };

        if (Array.isArray(bookmarkTree) && bookmarkTree.length > 0) {
            bookmarkTree.forEach(rootNode => checkBookmarkDetail(rootNode));
        }

        return results;
    }, [bookmarkTree]);



    const filteredSections = useMemo(() => {
        if (!searchQuery.trim()) return bookmarkSections;

        return bookmarkSections.map(section => ({
            ...section,
            cards: section.cards.filter(card =>
                card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                card.url.toLowerCase().includes(searchQuery.toLowerCase())
            )
        })).filter(section => section.cards.length > 0 || section.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [bookmarkSections, searchQuery]);


    const buttonBaseClass = "flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-bold transition-all active:scale-95 shadow-sm";

    return (
        <div className="h-screen flex flex-col bg-[#1e1e26] text-white font-sans overflow-hidden " >
            <div className="p-8 pb-0 flex-none">
                <header className="flex items-center gap-4 mb-6">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-100">My Bookmark</h1>
                    <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                        {bookmarkSections.length} Folders
                    </span>
                </header>

                <section className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#25252f]/50 p-3 rounded-2xl border border-gray-800/50 backdrop-blur-sm shadow-xl relative z-30">
                    <div className="flex items-center gap-3">

                        <div className="relative group">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="SEARCH"
                                className="bg-[#1e1e26] border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-sm w-60 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600 font-medium"
                            />
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
                                <span className="min-w-[100px] text-left ">{reorderMode}</span>
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
                            <button className="flex items-center gap-1.5 px-4 py-1.5 text-[11px] font-bold text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-all  tracking-wider active:scale-95">
                                <ChevronDoubleDownIcon className="w-3.5 h-3.5" /> EXPAND
                            </button>
                            <div className="w-[1px] h-3 bg-gray-800" />
                            <button className="flex items-center gap-1.5 px-4 py-1.5 text-[11px] font-bold text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-all  tracking-wider active:scale-95">
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
                                <div className="flex items-center gap-2.5 flex-1 justify-start  tracking-wide">
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
                            <span className="shrink-0 ">ADD FOLDER</span>
                        </button>
                    </div>
                </section>

            </div>








            <main  className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">

                {isCreating && (
                  <AddBookmark
                      onSave={() => {

                          setIsCreating(false);
                      }}
                      onCancel={() => setIsCreating(false)}
                  />
                )}


                {filteredSections.map((section) => (
                    <BookmarkSection
                        key={section.id}
                        title={section.title}
                        cards={section.cards}
                        viewMode={viewMode}
                    />
                ))}

                {filteredSections.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 font-medium">No bookmarks found matching your search.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default BookmarkGroup;