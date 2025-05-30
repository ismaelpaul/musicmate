import { FaPause, FaPlay } from 'react-icons/fa6';
import IconButton from '../Buttons/IconButton';

export default function SpotifyPlayerControls({
	isPaused,
	onTogglePlay,
}: {
	isPaused: boolean;
	onTogglePlay: () => void;
}) {
	return (
		<IconButton
			icon={isPaused ? <FaPlay /> : <FaPause />}
			onClick={onTogglePlay}
			className="flex items-center justify-center bg-green-500 hover:bg-green-600 px-4 py-2 h-10 mt-4 w-full rounded-full"
		/>
	);
}
