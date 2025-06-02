import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: {
			spotify_id: string;
			full_name: string;
			email: string;
			image: string;
		};
		accessToken: string;
	}

	interface User extends DefaultUser {
		spotify_id: string;
		full_name?: string;
		email?: string;
		image?: string;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		accessToken: string;
		refreshToken: string;
		accessTokenExpires: number;
		user?: {
			name?: string | null;
			email?: string | null;
			image?: string | null;
			spotify_id: string;
		};
	}
}
