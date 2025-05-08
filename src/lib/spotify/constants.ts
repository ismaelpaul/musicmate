export const STATE_KEY = 'spotify_auth_state';
export const TOKEN_COOKIE_KEY = 'spotify_access_token';
export const SCOPE =
	'user-read-private user-read-email streaming user-modify-playback-state';

export const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
export const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
export const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI!;
