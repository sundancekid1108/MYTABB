import React, { useState, useEffect, useMemo  } from 'react';
import {
    XMarkIcon,
    ShareIcon,
    DocumentDuplicateIcon,
    PencilSquareIcon,
    EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';

const TabCard = (props ) => {
    const  {title, url,   onClose } = props
    const [isSelected, setIsSelected] = useState(false);
    const [favicon, setFavicon] = useState(null);





    const getFaviconUrl = (pageUrl) => {
        const extensionId = chrome.runtime.id
        if (!pageUrl) return null;

        if (extensionId) {

            return `chrome-extension://${extensionId}/_favicon/?pageUrl=${encodeURIComponent(pageUrl)}&size=32`;
        }


        const faviconDomain = new URL(pageUrl).hostname.replace(/^www\./, '');
        return
            `https://www.google.com/s2/favicons?domain=${faviconDomain}&sz=32`
;
    };
    

    // favicon 설정
    useEffect(() => {
        const faviconSrc = getFaviconUrl(url);
        setFavicon(faviconSrc);
    }, [url]);



    // 이미지 로드 실패 시 fallback 처리
    const handleImageError = (event) => {
        if (!favicon) return;

        // Chrome API 실패 → Google로 fallback
        if (favicon.includes('chrome-extension')) {
            if (url) {
                const domain = new URL(url).hostname.replace(/^www\./, '');
                const fallbackUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
                setFavicon(fallbackUrl);
            }
        }
        // Google도 실패하면 기본 아이콘
        else {
            event.target.src = 'https://www.google.com/s2/favicons?domain=google.com&sz=32';
        }
    };

    const handleTabCardClick = () => {
            window.open(url, '_blank', 'noopener,noreferrer');

    };


    return (

        <div className="group relative bg-[#2d2d3a] hover:bg-[#353545] p-3 rounded-xl border border-transparent hover:border-gray-600 transition-all cursor-pointer shadow-md flex flex-col h-full w-full max-w-[280px] mx-auto"
             onClick={handleTabCardClick}>


            <button
                type="button"
                className="absolute top-2 right-2 p-1 rounded-md text-gray-500 hover:text-white hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-all z-10"
                onClick={(event) => {
                    event.stopPropagation();
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
                        {favicon ? (
                            <img
                                src={favicon}
                                loading="lazy"
                                alt=""
                                className="w-full h-full object-contain p-0.5"
                                onError={handleImageError}
                            />
                        ) : (
                            // favicon가 null일 때 기본 placeholder
                            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                <span className="text-gray-500 text-xs">★</span>
                            </div>
                        )}
                    </div>

                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => setIsSelected(!isSelected)}
                        onClick={(event) => event.stopPropagation()}
                        className={`absolute inset-0 w-4 h-4 m-auto cursor-pointer rounded border-gray-600 bg-gray-900 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900 transition-all duration-200 ${
                            isSelected ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-100 scale-100'
                        }`}
                    />
                </div>

                <h3 className="text-sm font-semibold text-gray-100 truncate pr-6">
                    {title}
                </h3>
            </div>



            <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-1">
                <button
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-blue-600 text-gray-400 hover:text-white transition-all shadow-sm"
                    onClick={(event) => event.stopPropagation()}
                    title="Share"
                >
                    <ShareIcon className="w-4 h-4" />
                </button>

                <button
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-yellow-500 text-gray-400 hover:text-white transition-all shadow-sm"
                    onClick={(event) => event.stopPropagation()}
                    title="Duplicate"
                >
                    <DocumentDuplicateIcon className="w-4 h-4" />
                </button>

                <button
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-green-600 text-gray-400 hover:text-white transition-all shadow-sm"
                    onClick={(event) => event.stopPropagation()}
                    title="Edit"
                >
                    <PencilSquareIcon className="w-4 h-4" />
                </button>

                <button
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-gray-600 text-gray-400 hover:text-white transition-all shadow-sm"
                    onClick={(event) => event.stopPropagation()}
                    title="More"
                >
                    <EllipsisHorizontalIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default TabCard;