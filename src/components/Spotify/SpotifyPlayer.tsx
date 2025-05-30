import SpotifyProgressBar from './SpotifyProgressBar';
import SpotifyPlayerControls from './SpotifyPlayerControls';

import {
	useSpotifyPlayerActions,
	useSpotifyPlayerState,
} from '@/context/SpotifyPlayerContext';
import SpotifyTrackInfo from './SpotifyTrackInfo';

export default function SpotifyPlayer() {
	const { seek, togglePlay } = useSpotifyPlayerActions();
	const { duration, position, isPaused, currentTrackPlaying } =
		useSpotifyPlayerState();

	if (!currentTrackPlaying) return;

	return (
		<div
			className="w-full p-4 text-white rounded-lg shadow-lg bg-cover bg-center mt-70"
			style={{
				backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2)), url(${currentTrackPlaying.album.images[0].url})`,
			}}
		>
			<SpotifyTrackInfo track={currentTrackPlaying} />

			<SpotifyProgressBar
				position={position}
				duration={duration}
				onSeek={seek}
			/>
			<SpotifyPlayerControls isPaused={isPaused} onTogglePlay={togglePlay} />
		</div>
	);
}
