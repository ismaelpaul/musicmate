'use client';

import { useMobile } from '@/hooks/useMobile/useMobile';
import Sidebar from '../Sidebar/Sidebar';
import { Topbar } from '../Topbar/Topbar';
import { useSidebarStore } from '@/store/useSidebarStore';
import { Overlay } from '../Overlay/Overlay';

export default function Layout({ children }: { children: React.ReactNode }) {
	const { isExpanded } = useSidebarStore();
	const isMobile = useMobile();

	return (
		<div className="relative flex h-screen overflow-hidden">
			<Sidebar />

			{isMobile && isExpanded && <Overlay />}

			<div className="flex flex-col flex-1 relative transition-all duration-300">
				<Topbar />

				<main className="flex flex-col flex-1 gap-4 max-w-3xs md:max-w-sm lg:max-w-3xl sm:pt-10 md:p-6 overflow-auto mx-auto z-10 relative">
					{children}
				</main>
			</div>
		</div>
	);
}
