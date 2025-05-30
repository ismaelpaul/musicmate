import { useSidebarStore } from '@/store/useSidebarStore';

export function RecommendationLimitSlider() {
	const { recommendationLimit, setRecommendationLimit } = useSidebarStore();

	return (
		<div className="flex flex-col gap-2">
			<label htmlFor="slider" className="text-sm font-medium text-gray-700">
				Number of Recommendations: {recommendationLimit}
			</label>
			<input
				id="slider"
				type="range"
				min={5}
				max={20}
				value={recommendationLimit}
				onChange={(e) => setRecommendationLimit(Number(e.target.value))}
			/>
		</div>
	);
}
