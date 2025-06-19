import { useSidebarStore } from '@/store/useSidebarStore';

export const SearchRecommendations = () => {
	const { setIsNaturalLanguageSearchEnabled } = useSidebarStore.getState();

	return (
		<div className="flex flex-col items-start gap-2 pl-8">
			<button
				onClick={() => setIsNaturalLanguageSearchEnabled(true)}
				className="text-lg dark:text-gray-400 cursor-pointer"
			>
				Natural language
			</button>
			<button
				onClick={() => setIsNaturalLanguageSearchEnabled(false)}
				className="text-lg dark:text-gray-300 cursor-pointer"
			>
				Attribute based
			</button>
		</div>
	);
};
