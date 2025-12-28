import { useSidebarStore } from '@/store/useSidebarStore';

export const SearchRecommendations = () => {
	const { setIsNaturalLanguageSearchEnabled, isNaturalLanguageSearchEnabled } =
		useSidebarStore.getState();

	return (
		<div className="flex flex-col items-start">
			<button
				onClick={() => setIsNaturalLanguageSearchEnabled(true)}
				className={`w-full text-left align text-lg dark:text-gray-400 cursor-pointer hover:bg-gray-200 pl-12 py-2 ${
					isNaturalLanguageSearchEnabled ? 'font-bold text-black' : ''
				}`}
			>
				Natural language
			</button>
			<button
				onClick={() => setIsNaturalLanguageSearchEnabled(false)}
				className={`w-full text-left text-lg dark:text-gray-400 cursor-pointer hover:bg-gray-200 pl-12 py-2 ${
					!isNaturalLanguageSearchEnabled ? 'font-bold text-black' : ''
				}`}
			>
				Attribute based
			</button>
		</div>
	);
};
