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
		'flex flex-col items-center z-40 border-r border-gray-200 transition-[width, transform] duration-300 bg-white';

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
					className={`text-2xl p-3 ${
						isExpanded
							? 'ml-auto'
							: 'hover:bg-gray-200 w-full flex flex-col items-center'
					}`}
					onClick={toggleSidebar}
				/>

				<ul
					className={`w-full ${
						isExpanded ? '' : 'hover:bg-gray-200'
					} cursor-pointer`}
				>
					{SIDEBAR_ITEMS.map((item) => (
						<li
							key={item.id}
							className={`flex flex-col gap-2 ${
								isExpanded ? '' : 'items-center p-3'
							}`}
						>
							<SidebarItem item={item} />
						</li>
					))}
				</ul>

				{isExpanded && <SpotifyPlayer />}
			</aside>
		</>
	);
}
