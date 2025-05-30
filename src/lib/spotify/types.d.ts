import { RecommendationTrack } from '@/components/Spotify/types';

export interface SpotifyTokenResponse {
	access_token: string;
	token_type: string;
	scope: string;
	expires_in: number;
	refresh_token?: string;
}

export interface SpotifySearchResponse {
	tracks: {
		items: SpotifySearchTrackItem[];
		total: number;
	} | null;
}

export interface SpotifySearchTrackItem {
	id: string;
	name: string;
	artists: { name: string }[];
}

interface Window {
	Spotify: typeof Spotify;
	onSpotifyWebPlaybackSDKReady: () => void;
}

export interface ISpotifyPlayerState {
	deviceId: string | null;
	isPaused: boolean;
	position: number;
	duration: number;
	currentTrackUri: string | null;
	currentTrackPlaying: RecommendationTrack | null;
}

export interface ISpotifyPlayerActions {
	playTrack: (track: RecommendationTrack) => Promise<void>;
	togglePlay: () => void;
	seek: (ms: number) => Promise<void>;
}
