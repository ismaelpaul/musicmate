import { Pause, Play } from 'lucide-react';
import IconButton from '../IconButton';

export default function SpotifyPlayerControls({
	isPaused,
	onTogglePlay,
}: {
	isPaused: boolean;
	onTogglePlay: () => void;
}) {
	return (
		<IconButton
			icon={isPaused ? <Play /> : <Pause />}
			onClick={onTogglePlay}
			className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full"
		/>
	);
}
