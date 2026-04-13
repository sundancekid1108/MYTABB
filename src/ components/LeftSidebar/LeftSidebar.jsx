
import NavItem from '../NavItem/NavItem.jsx';
import {
    Bars3Icon,
    PlusIcon,
    QuestionMarkCircleIcon,
    BellIcon,
    MagnifyingGlassIcon,
    LinkIcon,
    BookmarkIcon,
    ArrowsUpDownIcon,
    StarIcon,
    LockClosedIcon,
    UserPlusIcon,
    Cog6ToothIcon,
    SquaresPlusIcon,
    UserIcon
} from '@heroicons/react/24/outline';

const LeftSidebar = () => {
    return (
        <div className="flex h-screen bg-[#1e1e26] text-gray-300 font-sans border-r border-gray-800">


            <section className="w-16 flex flex-col items-center py-6 border-r border-gray-800 h-full">


                <div className="flex flex-col items-center gap-6 w-full mb-auto">

                    <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-500 transition-colors">
                        <Bars3Icon className="w-5 h-5" />
                    </button>


                    {/*<div className="w-10 h-10 bg-purple-600/20 text-purple-400 flex items-center justify-center rounded-xl font-bold text-xs cursor-grab active:cursor-grabbing border border-purple-500/10 shadow-lg">*/}
                    {/*    SW*/}
                    {/*</div>*/}

                
                    {/*<button className="p-2.5 bg-gray-800/40 hover:bg-gray-800 rounded-lg text-gray-400 transition-colors border border-gray-700/50">*/}
                    {/*    <PlusIcon className="w-5 h-5" strokeWidth={2.5} />*/}
                    {/*</button>*/}
                </div>


                <div className="flex flex-col items-center w-full px-2 gap-2">
                    <button className="p-2.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-all">
                        <QuestionMarkCircleIcon className="w-5.5 h-5.5" />
                    </button>

                    <button className="p-2.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-all mb-2">
                        <BellIcon className="w-5.5 h-5.5" />
                    </button>



                    <div className="p-2.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-all mb-2">
                        <UserIcon className="w-5.5 h-5.5" />
                    </div>
                </div>
            </section>


            <section className="w-60 flex flex-col p-4">

                <div className="mb-6 px-2">
                    {/*<h2 className="text-xs font-bold text-gray-500 uppercase tracking-tight truncate">sundacne's organization</h2>*/}
                </div>

                <div className="space-y-1 mb-8">
                    <NavItem label="Search" icon={<MagnifyingGlassIcon className="w-[18px] h-[18px]" />} />
                    <NavItem label="To / Links" icon={<LinkIcon className="w-[18px] h-[18px]" />} />
                    <NavItem label="Next" icon={<BookmarkIcon className="w-[18px] h-[18px]" />} />
                </div>


                <div className="flex-1 overflow-y-auto">
                    <div className="flex justify-between items-center px-2 mb-2">
                        <h3 className="text-[11px] font-bold text-gray-600 uppercase">Spaces</h3>
                        <div className="flex gap-2 text-gray-600">
                            <button className="hover:text-gray-300 transition-colors">
                                <ArrowsUpDownIcon className="w-3.5 h-3.5" />
                            </button>
                            <button className="hover:text-gray-300 transition-colors">
                                <SquaresPlusIcon className="w-4 h-4" strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <NavItem
                            label="Starred Collections"
                            icon={<StarIcon className="w-4 h-4 text-yellow-500" fill="currentColor" />}
                        />
                        <NavItem
                            active
                            label="My Collections"
                            icon={<LockClosedIcon className="w-4 h-4" />}
                        />
                    </div>
                </div>

                {/*<div className="mt-auto pt-4 space-y-4">*/}
                {/*    <div className="space-y-1 border-t border-gray-800 pt-4">*/}
                {/*        <NavItem*/}
                {/*            label="Invite members"*/}
                {/*            icon={<UserPlusIcon className="w-4 h-4" />}*/}
                {/*        />*/}
                {/*        <NavItem*/}
                {/*            label="Organization settings"*/}
                {/*            icon={<Cog6ToothIcon className="w-4 h-4" />}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</div>*/}
            </section>
        </div>
    );
};

export default LeftSidebar;