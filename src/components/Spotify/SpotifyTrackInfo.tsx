import React, { useEffect, useRef, useState } from 'react';
import { RecommendationTrack, SpotifyArtist } from './types';

export default function SpotifyTrackInfo({
	track,
}: {
	track?: RecommendationTrack;
}) {
	const textRef = useRef<HTMLSpanElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [animation, setAnimation] = useState('');

	useEffect(() => {
		if (!track) return;
		const text = textRef.current;
		const container = containerRef.current;

		if (text && container) {
			const textWidth = text.offsetWidth;
			const containerWidth = container.offsetWidth;

			const totalDistance = textWidth + containerWidth;
			const speed = 50;
			const duration = totalDistance / speed;

			const keyframes = `
				@keyframes scroll {
					0% { transform: translateX(${containerWidth}px); }
					100% { transform: translateX(-${textWidth}px); }
				}
			`;

			setAnimation(keyframes);

			text.style.animation = `scroll ${duration}s linear infinite`;
		}
	}, [track]);

	if (!track) return null;

	return (
		<div
			ref={containerRef}
			className="relative overflow-hidden w-full h-6 flex items-center group"
			style={{
				maskImage:
					'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
				WebkitMaskImage:
					'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
			}}
		>
			<style>{animation}</style>

			<span
				ref={textRef}
				className="absolute whitespace-nowrap font-bold text-lg group-hover:[animation-play-state:paused]"
			>
				{track.name} -{' '}
				<span className="text-gray-400 font-normal">
					{track.artists.map((artist: SpotifyArtist) => artist.name).join(', ')}
				</span>
			</span>
		</div>
	);
}
