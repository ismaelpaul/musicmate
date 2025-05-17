import SpotifyPlayer from '../Spotify/SpotifyPlayer';
import IconButton from '../Buttons/IconButton';
import {
	TbLayoutSidebarLeftCollapseFilled,
	TbLayoutSidebarLeftExpandFilled,
} from 'react-icons/tb';
import { useSidebarStore } from '@/store/useSidebarStore';
import { RecommendationLimitSlider } from '../Recommendations/RecommendationLimitSlider';

export default function Sidebar() {
	const { isExpanded, setIsExpanded } = useSidebarStore();

	return (
		<div
			className={`relative flex flex-col flex-shrink-0 transition-all duration-300 bg-gray-200 ${
				isExpanded ? 'p-4 w-96' : 'px-0 py-4 w-12'
			}`}
		>
			<IconButton
				onClick={() => setIsExpanded(!isExpanded)}
				icon={
					isExpanded ? (
						<TbLayoutSidebarLeftCollapseFilled />
					) : (
						<TbLayoutSidebarLeftExpandFilled />
					)
				}
				className="justify-end text-3xl text-black"
			/>

			{isExpanded && (
				<>
					<RecommendationLimitSlider />
					<div className="flex-1 overflow-hidden">
						<SpotifyPlayer />
					</div>
				</>
			)}
		</div>
	);
}
