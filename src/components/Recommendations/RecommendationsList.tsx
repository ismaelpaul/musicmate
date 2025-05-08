import { RecommendationTrack } from '../Spotify/types';
import {
	useSpotifyPlayerActions,
	useSpotifyPlayerState,
} from '@/context/SpotifyPlayerContext';
import { RecommendationItem } from './RecommendationItem';

interface Props {
	tracks: RecommendationTrack[];
}

export function RecommendationList({ tracks }: Props) {
	const { playTrack } = useSpotifyPlayerActions();
	const { currentTrackUri } = useSpotifyPlayerState();

	const isPlaying = (uri: string) => currentTrackUri === uri;

	return (
		<div className="space-y-2">
			<p className="mb-2 font-medium">Here are some recommendations:</p>
			{tracks.map((track) => (
				<RecommendationItem
					key={track.id}
					track={track}
					isPlaying={isPlaying(track.uri)}
					onPlay={() => playTrack(track.uri)}
				/>
			))}
		</div>
	);
}
