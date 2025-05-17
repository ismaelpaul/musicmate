import { create } from 'zustand';

interface useSidebarStore {
	isExpanded: boolean;
	setIsExpanded: (args: boolean) => void;
	recommendationLimit: number;
	setRecommendationLimit: (args: number) => void;
}

export const useSidebarStore = create<useSidebarStore>((set) => ({
	isExpanded: false,
	setIsExpanded: (value: boolean) => set({ isExpanded: value }),

	recommendationLimit: 5,
	setRecommendationLimit: (value: number) =>
		set({ recommendationLimit: value }),
}));
