interface SpotifyFollowers {
	href: string | null;
	total: number;
}

interface SpotifyExternalUrls {
	spotify: string;
}

interface SpotifyArtist {
	external_urls: SpotifyExternalUrls;
	followers?: SpotifyFollowers;
	genres?: string[];
	href: string;
	id: string;
	images?: SpotifyImage[];
	name: string;
	popularity?: number;
	type: string;
	uri: string;
}

interface SpotifyImage {
	height: number;
	url: string;
	width: number;
}

interface SpotifyAlbum {
	album_type: 'album' | 'single' | 'compilation';
	artists: SpotifyArtist[];
	external_urls: SpotifyExternalUrls;
	href: string;
	id: string;
	images: SpotifyImage[];
	is_playable: boolean;
	name: string;
	release_date: string;
	release_date_precision: 'year' | 'month' | 'day';
	total_tracks: number;
	type: string;
	uri: string;
}

interface SpotifyExternalIds {
	isrc?: string;
}

export interface RecommendationTrack {
	album: SpotifyAlbum;
	artists: SpotifyArtist[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: SpotifyExternalIds;
	external_urls: SpotifyExternalUrls;
	href: string;
	id: string;
	is_local: boolean;
	is_playable: boolean;
	name: string;
	popularity: number;
	preview_url: string | null;
	track_number: number;
	type: string;
	uri: string;
}
