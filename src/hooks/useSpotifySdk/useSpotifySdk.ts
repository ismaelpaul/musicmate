import { useEffect, useState } from 'react';

export const useSpotifySdk = () => {
	const [sdkReady, setSdkReady] = useState(false);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		if (window.Spotify) {
			console.log('Spotify SDK OK');

			setSdkReady(true);
			return;
		}

		const script = document.createElement('script');
		script.src = 'https://sdk.scdn.co/spotify-player.js';
		script.async = true;
		script.onload = () => setSdkReady(true);
		script.onerror = () => console.error('Failed to load Spotify SDK');
		document.body.appendChild(script);

		return () => {
			window.onSpotifyWebPlaybackSDKReady = () => {};
		};
	}, []);

	return sdkReady;
};
