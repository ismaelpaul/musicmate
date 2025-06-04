'use client';

import { CgClose } from 'react-icons/cg';
import { FiMenu } from 'react-icons/fi';
import IconButton from '../Buttons/IconButton';
import { SIDEBAR_ITEMS } from './sidebar-items';
import { SidebarItem } from './SidebarItem';
import { useMobile } from '@/hooks/useMobile/useMobile';
import { useSidebarStore } from '@/store/useSidebarStore';
import SpotifyPlayer from '../Spotify/SpotifyPlayer';

export default function Sidebar() {
	const { isExpanded, setIsExpanded } = useSidebarStore();
	const isMobile = useMobile();
	const toggleSidebar = () => {
		setIsExpanded(!isExpanded);
	};

	const baseStyles =
		'flex flex-col py-4 px-6 gap-4 z-40 border-r border-gray-200 transition-[width, transform] duration-300 bg-white';

	const mobileStyles = isExpanded
		? 'fixed inset-y-0 left-0 transform translate-x-0 w-64'
		: 'fixed inset-y-0 left-0 transform -translate-x-full w-10';

	const desktopStyles = isExpanded
		? 'relative w-64 transition-[width] duration-300'
		: 'relative w-18 transition-[width] duration-300';

	return (
		<>
			<aside
				className={`${baseStyles} ${isMobile ? mobileStyles : desktopStyles}`}
			>
				<IconButton
					icon={isExpanded ? <CgClose /> : <FiMenu />}
					className="text-2xl ml-auto p-0"
					onClick={toggleSidebar}
				/>

				<ul>
					{SIDEBAR_ITEMS.map((item) => (
						<li key={item.id} className="flex flex-col items-start gap-2">
							<SidebarItem item={item} />
						</li>
					))}
				</ul>

				{isExpanded && <SpotifyPlayer />}
			</aside>
		</>
	);
}
