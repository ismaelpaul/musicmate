'use client';

import { RecommendationTrack } from '@/components/Spotify/types';
import { useSpotifyPlayer } from '@/hooks/useSpotifyPlayer/useSpotifyPlayer';
import { useSpotifySdk } from '@/hooks/useSpotifySdk/useSpotifySdk';

import { playTrackApi } from '@/lib/spotify/service/api';
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
			if (!deviceId || !token || !playerInstance) return;
			setCurrentTrackPlaying(track);
			const trackUri = track.uri;
			await playTrackApi(deviceId, token, trackUri);
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
		}),
		[
			deviceId,
			isPaused,
			position,
			duration,
			currentTrackUri,
			currentTrackPlaying,
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
