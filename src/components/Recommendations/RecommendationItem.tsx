import { FaPause } from 'react-icons/fa6';
import IconButton from '../Buttons/IconButton';
import Image from 'next/image';
import { RecommendationTrack } from '../Spotify/types';
import { FaPlay } from 'react-icons/fa';
import { useSidebarStore } from '@/store/useSidebarStore';

interface RecommendationItemProps {
	track: RecommendationTrack;
	playTrack: (track: RecommendationTrack) => Promise<void>;
	currentTrackUri: string | null;
	deviceId: string | null;
	togglePlay: () => void;
	isPaused: boolean;
}

export function RecommendationItem({
	track,
	playTrack,
	currentTrackUri,
	deviceId,
	togglePlay,
	isPaused,
}: RecommendationItemProps) {
	const { setIsExpanded } = useSidebarStore();
	const isThisTrackTheCurrentOne = currentTrackUri === track.uri;

	const isThisTrackPlayingActive = isThisTrackTheCurrentOne && !isPaused;

	const handlePlaySpecificTrack = () => {
		if (deviceId) {
			setIsExpanded(true);
			playTrack(track);
		} else {
			console.warn(
				'RecommendationItem: Play clicked, but deviceId is not available.'
			);
		}
	};

	const handleToggleCurrentTrack = () => {
		togglePlay();
	};

	return (
		<div
			className={`flex justify-between items-center p-2 rounded-lg bg-white ${
				isThisTrackTheCurrentOne ? 'border drop-shadow-md' : ''
			} hover:bg-gray-200 transition-colors duration-200`}
		>
			<div className="flex items-center gap-3">
				<Image
					src={track.album.images[0].url}
					alt="Album cover"
					width={50}
					height={50}
					className="rounded-full"
				/>
				<div className="flex flex-col text-lg">
					<p className="text-black font-bold">{track.name}</p>
					<div className="flex gap-2">
						{track.artists.map((artist, index) => (
							<small key={artist.id} className="text-black">
								{artist.name}
								{index < track.artists.length - 1 && ','}
							</small>
						))}
					</div>
				</div>
			</div>
			<IconButton
				className="flex items-center justify-center bg-black p-3 rounded-full cursor-pointer text-white hover:bg-green-spotify ml-3"
				onClick={
					isThisTrackTheCurrentOne
						? handleToggleCurrentTrack
						: handlePlaySpecificTrack
				}
				disabled={!deviceId}
				icon={isThisTrackPlayingActive ? <FaPause /> : <FaPlay />}
			/>
		</div>
	);
}
