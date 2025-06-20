'use client';

import { useMobile } from '@/hooks/useMobile/useMobile';
import Sidebar from '../Sidebar/Sidebar';
import { Topbar } from '../Topbar/Topbar';
import { useSidebarStore } from '@/store/useSidebarStore';
import { Overlay } from '../Overlay/Overlay';

export default function Layout({ children }: { children: React.ReactNode }) {
	const { isExpanded } = useSidebarStore();
	const isMobile = useMobile();

	const isNaturalLanguageSearchEnabled = useSidebarStore(
		(state) => state.isNaturalLanguageSearchEnabled
	);

	return (
		<div className="relative flex h-screen">
			<Sidebar />

			{isMobile && isExpanded && <Overlay />}

			<div className="flex flex-col flex-1 relative transition-all duration-300">
				<Topbar />

				<main
					className={`flex flex-col flex-1 gap-4 sm:pt-10 md:p-6 lg:px-10	 z-10 relative ${
						isNaturalLanguageSearchEnabled
							? 'max-w-3xs md:max-w-2xl lg:max-w-3xl mx-auto'
							: 'p-5 md:overflow-y-auto no-scrollbar'
					}`}
				>
					{children}
				</main>
			</div>
		</div>
	);
}
