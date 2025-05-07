import { CirclePause, PlayCircle } from 'lucide-react';
import IconButton from '../IconButton';
import Image from 'next/image';
import { RecommendationTrack } from '../Spotify/types';

interface RecommendationItemProps {
	track: RecommendationTrack;
	isPlaying: boolean;
	onPlay: () => void;
}

export function RecommendationItem({
	track,
	isPlaying,
	onPlay,
}: RecommendationItemProps) {
	return (
		<div className="flex justify-between items-center p-2 bg-white rounded-lg">
			<div className="flex items-center gap-3">
				<Image
					src={track.album.images[0].url}
					alt="Album cover"
					width={50}
					height={50}
					className="rounded-full"
				/>
				<div className="flex flex-col">
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
				className="cursor-pointer"
				onClick={onPlay}
				icon={isPlaying ? <CirclePause /> : <PlayCircle />}
			/>
		</div>
	);
}
