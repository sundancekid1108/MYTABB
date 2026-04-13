import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useTabStore from "../../utils/zustand/tabstore.js";
import useModalStore from "../../utils/zustand/modalstore.js";
import {
	XMarkIcon,
	FolderPlusIcon,
	FolderArrowDownIcon,
	ChevronRightIcon,
} from "@heroicons/react/24/outline";

const Modal = () => {
	const selectedTabs = useTabStore((state) => state.selectedTabs);
	const { isModalOpen, openModal, closeModal } = useModalStore();

	const handleAddToExistingCollection = () => {
		console.log("기존 컬렉션 추가 로직 실행");
		console.log(selectedTabs)
	};
	const handleCreateCollection = () => {
		console.log("새 컬렉션 생성 로직 실행");
		console.log(selectedTabs)
	};

	useEffect(() => {
		if (selectedTabs.length > 0) {
			openModal(); // selectedTabs 1개 이상이면 모달 노출
		} else {
			closeModal(); // selectedTabs 0이면 모달 x
		}
	}, [selectedTabs]);



	return (
		<Transition show={isModalOpen} as={Fragment}>
			<Dialog as="div" className="relative z-50 "  onClose={closeModal}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 uppercase">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95">
							<Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-[2rem] bg-white p-6 text-center shadow-2xl transition-all">
								<div className="flex justify-end">
									<button
										onClick={closeModal}
										className="p-2 hover:bg-gray-100 rounded-full transition-colors group">
										<XMarkIcon className="w-6 h-6 text-gray-400 group-hover:text-gray-600" />
									</button>
								</div>

								<div className="mt-2 mb-8">
									<div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4">
										<FolderPlusIcon className="w-8 h-8 text-blue-600" />
									</div>
									<Dialog.Title
										as="h3"
										className="text-2xl font-black text-gray-900 leading-tight ">
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

								<div className="space-y-3 ">

									<button
										type="button"
										className="w-full flex items-center justify-between gap-3 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-bold text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all group"
										onClick={handleAddToExistingCollection}>
										<div className="flex items-center gap-3  uppercase">
											<FolderArrowDownIcon className="w-5 h-5 text-blue-200" />
											<span>Add to Existing Collection</span>
										</div>

										<ChevronRightIcon className="w-5 h-5 text-blue-300 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
									</button>


									<button
										type="button"
										className="w-full flex items-center justify-between gap-3 rounded-2xl bg-gray-50 border border-gray-200 px-6 py-4 text-sm font-bold text-gray-900 hover:bg-gray-100 transition-all group"
										onClick={handleCreateCollection}>
										<div className="flex items-center gap-3 uppercase ">
											<FolderPlusIcon className="w-5 h-5 text-gray-500" />
											<span>Create New Collection</span>
										</div>

										<ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default Modal;