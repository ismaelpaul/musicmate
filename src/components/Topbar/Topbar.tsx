'use client';

import { useSidebarStore } from '@/store/useSidebarStore';
import { FiMenu } from 'react-icons/fi';
import UserProfile from '../UserProfile/UserProfile';
import IconButton from '../Buttons/IconButton';

export const Topbar = () => {
	const { isExpanded, setIsExpanded } = useSidebarStore();

	const toggleSidebar = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<header className="h-14 flex items-center justify-between px-4 backdrop-blur-lg">
			<IconButton
				icon={<FiMenu />}
				className="md:hidden text-2xl"
				onClick={toggleSidebar}
			/>

			<div className="ml-auto">
				<UserProfile />
			</div>
		</header>
	);
};
