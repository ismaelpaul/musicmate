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
