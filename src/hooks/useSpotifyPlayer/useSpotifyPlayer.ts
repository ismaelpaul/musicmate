import { useEffect, useState, useRef } from 'react';

export const useSpotifyPlayer = (token: string | null, sdkReady: boolean) => {
	const [playerInstance, setPlayerInstance] = useState<Spotify.Player | null>(
		null
	);
	const [deviceId, setDeviceId] = useState<string | null>(null);
	const [isPaused, setIsPaused] = useState(true);
	const [position, setPosition] = useState(0);
	const [duration, setDuration] = useState(0);
	const [currentTrackUri, setCurrentTrackUri] = useState<string | null>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// init player
	useEffect(() => {
		console.log('[useSpotifyPlayer] Effect: Init Player');
		if (!token || !sdkReady || playerInstance) {
			console.log('[useSpotifyPlayer] Skipping init: ', {
				tokenAvailable: !!token,
				sdkReady,
				playerAlreadyExists: !!playerInstance,
			});
			return;
		}

		window.onSpotifyWebPlaybackSDKReady = () => {
			console.log('[Spotify SDK] Ready, creating player');
			const player: Spotify.Player = new window.Spotify.Player({
				name: 'MusicMate Player',
				getOAuthToken: (cb: (token: string) => void) => {
					console.log('[Spotify SDK] Fetching OAuth token');
					cb(token);
				},
				volume: 0.5,
			});
			setPlayerInstance(player);
		};

		if (window.Spotify && !playerInstance) {
			console.log('[Spotify SDK] Detected, initializing');
			window.onSpotifyWebPlaybackSDKReady();
		}
	}, [token, sdkReady, playerInstance]);

	// setup listeners
	useEffect(() => {
		if (!playerInstance) return;

		console.log('[Spotify Player] Setting up listeners');

		const handleReady = ({ device_id }: { device_id: string }) => {
			console.log('[Spotify Player] Ready with device ID:', device_id);
			setDeviceId(device_id);
		};

		const handleNotReady = () => {
			console.warn('[Spotify Player] Device went offline');
			setDeviceId(null);
		};

		const handleStateChanged = (state: Spotify.PlaybackState) => {
			if (!state) {
				console.warn('[Spotify Player] State is null');
				return;
			}
			console.log('[Spotify Player] State changed:', state);
			setIsPaused(state.paused);
			setPosition(state.position);
			setDuration(state.duration);
			setCurrentTrackUri(state.track_window?.current_track?.uri || null);
		};

		playerInstance.addListener('ready', handleReady);
		playerInstance.addListener('not_ready', handleNotReady);
		playerInstance.addListener('player_state_changed', handleStateChanged);
		playerInstance.addListener('initialization_error', (e) =>
			console.error('[Spotify Player] Initialization error', e)
		);
		playerInstance.addListener('authentication_error', (e) =>
			console.error('[Spotify Player] Authentication error', e)
		);
		playerInstance.addListener('account_error', (e) =>
			console.error('[Spotify Player] Account error', e)
		);
		playerInstance.addListener('playback_error', (e) =>
			console.error('[Spotify Player] Playback error', e)
		);

		playerInstance.connect().then((success: boolean) => {
			console.log(
				`[Spotify Player] Connect ${success ? 'succeeded' : 'failed'}`
			);
		});

		return () => {
			console.log('[Spotify Player] Cleaning up player instance');
			playerInstance.disconnect();
		};
	}, [playerInstance]);

	// track progress
	useEffect(() => {
		if (!isPaused && duration > 0) {
			console.log('[Player Progress] Starting interval');
			intervalRef.current = setInterval(() => {
				setPosition((prev) =>
					prev + 1000 < duration ? prev + 1000 : duration
				);
			}, 1000);
		} else if (intervalRef.current) {
			console.log('[Player Progress] Paused or finished, clearing interval');
			clearInterval(intervalRef.current);
		}

		return () => {
			clearInterval(intervalRef.current || undefined);
		};
	}, [isPaused, duration]);

	return {
		playerInstance,
		deviceId,
		isPaused,
		position,
		duration,
		currentTrackUri,
	};
};
