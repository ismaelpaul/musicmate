import { formatTime } from './utils';

export default function SpotifyProgressBar({
	position,
	duration,
	onSeek,
}: {
	position: number;
	duration: number;
	onSeek: (ms: number) => void;
}) {
	return (
		<div className="flex-1 mt-2">
			<input
				type="range"
				min={0}
				max={duration}
				value={position}
				onChange={(e) => onSeek(Number(e.target.value))}
				className="w-full"
			/>
			<div className="flex justify-between text-sm text-white mt-1">
				<span>{formatTime(position)}</span>
				<span>{formatTime(duration)}</span>
			</div>
		</div>
	);
}
