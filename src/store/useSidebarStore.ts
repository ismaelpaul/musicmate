import { create } from 'zustand';

interface useSidebarStore {
	isExpanded: boolean;
	setIsExpanded: (args: boolean) => void;

	isNaturalLanguageSearchEnabled: boolean;
	setIsNaturalLanguageSearchEnabled: (args: boolean) => void;
}

export const useSidebarStore = create<useSidebarStore>((set) => ({
	isExpanded: false,
	setIsExpanded: (value: boolean) => set({ isExpanded: value }),

	isNaturalLanguageSearchEnabled: true,
	setIsNaturalLanguageSearchEnabled: (value: boolean) =>
		set({ isNaturalLanguageSearchEnabled: value }),
}));
