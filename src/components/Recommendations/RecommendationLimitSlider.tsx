import { useSidebarStore } from '@/store/useSidebarStore';

export function RecommendationLimitSlider() {
	const { recommendationLimit, setRecommendationLimit } = useSidebarStore();

	return (
		<div className="flex flex-col gap-2">
			<label htmlFor="slider" className=" text-gray-700">
				Number of Recommendations:{' '}
				<span className="font-bold text-lg">{recommendationLimit}</span>
			</label>
			<input
				id="slider"
				type="range"
				min={1}
				max={20}
				value={recommendationLimit}
				onChange={(e) => setRecommendationLimit(Number(e.target.value))}
				className="accent-black"
			/>
		</div>
	);
}
