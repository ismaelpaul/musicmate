import { RecommendationTrack } from '../Spotify/types';

import { RecommendationItem } from './RecommendationItem';
import {
	useSpotifyPlayerActions,
	useSpotifyPlayerState,
} from '@/context/SpotifyPlayerContext';

interface Props {
	recommendationTracks: RecommendationTrack[];
}

export function RecommendationList({ recommendationTracks }: Props) {
	const { playTrack, togglePlay } = useSpotifyPlayerActions();
	const { deviceId, currentTrackUri, isPaused } = useSpotifyPlayerState();

	return (
		<div className="space-y-2">
			<p className="mb-2 font-medium">Here are some recommendations:</p>
			{recommendationTracks.map((track) => (
				<RecommendationItem
					key={track.id}
					track={track}
					playTrack={playTrack}
					togglePlay={togglePlay}
					currentTrackUri={currentTrackUri}
					deviceId={deviceId}
					isPaused={isPaused}
				/>
			))}
		</div>
	);
}
