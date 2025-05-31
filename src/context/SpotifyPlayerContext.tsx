'use client';

import { RecommendationTrack } from '@/components/Spotify/types';
import { useSpotifyPlayer } from '@/hooks/useSpotifyPlayer/useSpotifyPlayer';
import { useSpotifySdk } from '@/hooks/useSpotifySdk/useSpotifySdk';

import { playTrackApi } from '@/lib/spotify/api/playTrack';
import {
	ISpotifyPlayerActions,
	ISpotifyPlayerState,
} from '@/lib/spotify/types';

import { useSession } from 'next-auth/react';

import {
	createContext,
	useContext,
	useState,
	useMemo,
	useCallback,
	ReactNode,
} from 'react';

const SpotifyPlayerStateContext = createContext<ISpotifyPlayerState | null>(
	null
);
const SpotifyPlayerActionsContext = createContext<ISpotifyPlayerActions | null>(
	null
);

export function SpotifyPlayerProvider({ children }: { children: ReactNode }) {
	const [currentTrackPlaying, setCurrentTrackPlaying] =
		useState<RecommendationTrack | null>(null);

	const { data: session } = useSession();

	const token = session?.accessToken ?? null;

	const sdkReady = useSpotifySdk();
	const {
		playerInstance,
		deviceId,
		isPaused,
		position,
		duration,
		currentTrackUri,
	} = useSpotifyPlayer(token, sdkReady);

	const playTrack = useCallback(
		async (track: RecommendationTrack) => {
			if (!token || !playerInstance || !deviceId) return;

			// make sure device is active before playing
			try {
				await fetch('https://api.spotify.com/v1/me/player', {
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						device_ids: [deviceId],
						play: false,
					}),
				});

				setCurrentTrackPlaying(track);
				await playTrackApi(deviceId, token, track.uri);
			} catch (error) {
				console.error('Failed to play track:', error);
			}

			setCurrentTrackPlaying(track);
			await playTrackApi(deviceId, token, track.uri);
		},
		[deviceId, token, playerInstance]
	);

	const togglePlay = useCallback(() => {
		if (playerInstance) playerInstance.togglePlay();
	}, [playerInstance]);

	const seek = useCallback(
		async (ms: number) => {
			if (playerInstance) await playerInstance.seek(ms);
		},
		[playerInstance]
	);

	const stateValue = useMemo<ISpotifyPlayerState>(
		() => ({
			deviceId,
			isPaused,
			position,
			duration,
			currentTrackUri,
			currentTrackPlaying,
			setCurrentTrackPlaying,
		}),
		[
			deviceId,
			isPaused,
			position,
			duration,
			currentTrackUri,
			currentTrackPlaying,
			setCurrentTrackPlaying,
		]
	);

	const actionsValue = useMemo<ISpotifyPlayerActions>(
		() => ({
			playTrack,
			togglePlay,
			seek,
		}),
		[playTrack, togglePlay, seek]
	);

	return (
		<SpotifyPlayerActionsContext.Provider value={actionsValue}>
			<SpotifyPlayerStateContext.Provider value={stateValue}>
				{children}
			</SpotifyPlayerStateContext.Provider>
		</SpotifyPlayerActionsContext.Provider>
	);
}

export const useSpotifyPlayerState = (): ISpotifyPlayerState => {
	const context = useContext(SpotifyPlayerStateContext);
	if (!context) {
		throw new Error(
			'useSpotifyPlayerState must be used within a SpotifyPlayerProvider'
		);
	}
	return context;
};

export const useSpotifyPlayerActions = (): ISpotifyPlayerActions => {
	const context = useContext(SpotifyPlayerActionsContext);
	if (!context) {
		throw new Error(
			'useSpotifyPlayerActions must be used within a SpotifyPlayerProvider'
		);
	}
	return context;
};
