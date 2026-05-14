import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useTabStore from "../../utils/zustand/tabstore.js";
import useModalStore from "../../utils/zustand/modalstore.js";
import useBookmarkStore from "../../utils/zustand/bookmarkstore.js";
import {
	XMarkIcon,
	FolderPlusIcon,
	FolderArrowDownIcon,
	ChevronRightIcon,
	ChevronDownIcon,
} from "@heroicons/react/24/outline";


const Modal = () => {
	
	const {selectedTabs, clearSelectedTabs} = useTabStore()
	const {bookmarkFolders, addSelectedTabsToBookmarkFolder} = useBookmarkStore()
	const { isModalOpen, openModal, closeModal } = useModalStore();


	// 모달 내부 상태
	const [mode, setMode] = useState('initial'); // 'initial' | 'addExistingBookmarkFolder' | 'addNewBookmarkFolder'
	const [selectedFolder, setSelectedFolder] = useState('');
	const [bookmarkTitle, setBookmarkTitle] = useState('');

	const createBookmarkNameWithTime = () => {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');
		return `${year}-${month}-${day} ${hours}:${minutes}`;
	};

	const resetModal = () => {
		setMode('initial');
		setSelectedFolder('');
		setBookmarkTitle('');
	};

	const handleAddToExistingBookmark = () => {
		setMode('addExistingBookmarkFolder');

		if (!bookmarkTitle) {
			setBookmarkTitle(createBookmarkNameWithTime());
		}
	};

	const handleCreateNewBookmark = () => {
		setMode('addNewBookmarkFolder');
		if (!bookmarkTitle) {
			setBookmarkTitle(createBookmarkNameWithTime());
		}
	};

	const handleSaveToExistingBookmark = () => {
		console.log("기존 북마크에 저장:", {
			folder: selectedFolder,
			title: bookmarkTitle,
			tabs: selectedTabs
		});

		addSelectedTabsToBookmarkFolder(selectedTabs, selectedFolder)

		clearSelectedTabs()
		closeModal();
		resetModal();
	};





	// 셀렉트탭
	useEffect(() => {
		if (selectedTabs.length > 0) {
			openModal();
			setMode('initial'); // 새로 열릴 때 initial로
		} else {
			closeModal();
			resetModal();
		}
	}, [selectedTabs]);


	// 모달 닫을 때 초기화
	const handleClose = () => {
		closeModal();
		resetModal();
	};

	return (
		<Transition className="" show={isModalOpen} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={handleClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-[2rem] bg-white p-6 text-center shadow-2xl transition-all">
							{/*닫기버튼*/}
								<div className="flex justify-end">
									<button
										onClick={handleClose}
										className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
									>
										<XMarkIcon className="w-6 h-6 text-gray-400 group-hover:text-gray-600" />
									</button>
								</div>

								{/* 헤더*/}
								<div className="mt-2 mb-8">
									<div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4">
										<FolderPlusIcon className="w-8 h-8 text-blue-600" />
									</div>
									<Dialog.Title
										as="h3"
										className="text-2xl font-black text-gray-900 leading-tight"
									>
										Selected Tabs
									</Dialog.Title>
									<p className="text-gray-500 mt-2 font-medium">
										You have{" "}
										<span className="text-blue-600 font-bold">
                                            {selectedTabs.length}
                                        </span>{" "}
										tabs selected
									</p>
								</div>


								{mode === 'initial' && (
									<div className="space-y-3">
										<button
											type="button"
											className="w-full flex items-center justify-between gap-3 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-bold text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all group"
											onClick={handleAddToExistingBookmark}
										>
											<div className="flex items-center gap-3 ">
												<FolderArrowDownIcon className="w-5 h-5 text-blue-200" />
												<span>Add to Existing Bookmark</span>
											</div>
											<ChevronRightIcon className="w-5 h-5 text-blue-300 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
										</button>

										<button
											type="button"
											className="w-full flex items-center justify-between gap-3 rounded-2xl bg-gray-50 border border-gray-200 px-6 py-4 text-sm font-bold text-gray-900 hover:bg-gray-100 transition-all group"
											onClick={handleCreateNewBookmark}
										>
											<div className="flex items-center gap-3 ">
												<FolderPlusIcon className="w-5 h-5 text-gray-500" />
												<span>Create New Bookmark</span>
											</div>
											<ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
										</button>
									</div>
								)}

								{/*기존 북마크에 추가*/}
								{mode === 'addExistingBookmarkFolder' && (
									<div className="space-y-6 text-left">
										<div>
											<label className="block text-sm font-semibold text-gray-700 mb-2">
												Select Bookmark Folder
											</label>
											<div className="relative">
												<select
													value={selectedFolder}
													onChange={(e) => setSelectedFolder(e.target.value)}
													className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer "
												>
													<option value="">Select a folder...</option>

													{bookmarkFolders.map(folder => (
														<option key={folder.id} value={folder.id}>
															{folder.title}
														</option>
													))}
												</select>
												<ChevronDownIcon className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
											</div>
										</div>



										<div className="flex gap-3 pt-4">
											<button
												onClick={() => setMode('initial')}
												className="flex-1 py-4 border border-gray-300 rounded-2xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
											>
												Back
											</button>
											<button
												onClick={handleSaveToExistingBookmark}
												disabled={!selectedFolder || !bookmarkTitle.trim()}
												className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all active:scale-[0.985]"
											>
												Save to Folder
											</button>
										</div>
									</div>
								)}

								{/* 새로 북마크 폴더 만들어서 추가*/}
								{mode === 'addNewBookmarkFolder' && (
									<div className="space-y-6 text-left">
										<div>
											<label className="block text-sm font-semibold text-gray-700 mb-2">
												New Bookmark Title
											</label>
											<input
												type="text"
												value={bookmarkTitle}
												onChange={(e) => setBookmarkTitle(e.target.value)}
												placeholder="Enter new bookmark title"
												className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
											/>
										</div>

										<div className="flex gap-3 pt-4">
											<button
												onClick={() => setMode('initial')}
												className="flex-1 py-4 border border-gray-300 rounded-2xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
											>
												Back
											</button>
											<button
												onClick={() => {
													console.log("새 컬렉션 생성:", {
														title: bookmarkTitle,
														tabs: selectedTabs
													});
													closeModal();
													resetModal();
												}}
												disabled={!bookmarkTitle.trim()}
												className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all active:scale-[0.985]"
											>
												Create New Bookmark
											</button>
										</div>
									</div>
								)}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default Modal;