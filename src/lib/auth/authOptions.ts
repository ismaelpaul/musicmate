import SpotifyProvider from 'next-auth/providers/spotify';
import { prisma } from '@/prisma/config';
import { refreshAccessToken } from './utils/refreshAccessToken';
import { NextAuthOptions } from 'next-auth';
import { SCOPE } from '../spotify/constants';

export const authOptions: NextAuthOptions = {
	providers: [
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID!,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
			authorization: `https://accounts.spotify.com/authorize?scope=${SCOPE}`,
			profile(profile) {
				return {
					id: profile.id,
					spotify_id: profile.id,
					full_name: profile.display_name,
					email: profile.email,
					image: profile.images?.[0]?.url,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, account }) {
			if (account && user) {
				const expiresIn = account.expires_in as number;

				token.accessToken = account.access_token!;
				token.accessTokenExpires = Date.now() + expiresIn * 1000;
				token.refreshToken = account.refresh_token!;
				token.user = user;
			}

			if (Date.now() < (token.accessTokenExpires as number)) {
				return token;
			}

			// refresh the token if expired
			return await refreshAccessToken(token);
		},

		async session({ session, token }) {
			session.user = token.user as typeof session.user;
			session.accessToken = token.accessToken;
			return session;
		},

		async signIn({ user }) {
			const existingUser = await prisma.user.findUnique({
				where: { email: user.email! },
			});

			if (!existingUser) {
				await prisma.user.create({
					data: {
						email: user.email!,
						full_name: user.name,
						image: user.image,
						spotify_id: user.spotify_id,
					},
				});
			}

			return true;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
};
