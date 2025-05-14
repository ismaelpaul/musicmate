'use client';

import { SessionProvider } from 'next-auth/react';
import { SpotifyPlayerProvider } from '@/context/SpotifyPlayerContext';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<SpotifyPlayerProvider>{children}</SpotifyPlayerProvider>
		</SessionProvider>
	);
}
