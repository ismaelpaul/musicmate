'use client';

import { useSidebarStore } from '@/store/useSidebarStore';
import { TbLayoutSidebarLeftCollapseFilled } from 'react-icons/tb';
import UserProfile from '../UserProfile/UserProfile';
import IconButton from '../Buttons/IconButton';

export const Topbar = () => {
	const { isExpanded, setIsExpanded } = useSidebarStore();

	const toggleSidebar = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<header className="h-14 flex items-center justify-between px-4 bg-gray-100">
			<IconButton
				icon={<TbLayoutSidebarLeftCollapseFilled />}
				className="md:hidden w-8 h-8"
				onClick={toggleSidebar}
			/>

			<div className="ml-auto">
				<UserProfile />
			</div>
		</header>
	);
};
