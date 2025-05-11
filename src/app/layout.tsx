import type { Metadata } from 'next';
import './globals.css';
import { Zain } from 'next/font/google';

import { AuthProvider } from '@/context/AuthContext';
import { SpotifyPlayerProvider } from '@/context/SpotifyPlayerContext';

export const metadata: Metadata = {
	title: 'MusicMate',
	description: 'Your music recommendations mate',
};

const zain = Zain({
	subsets: ['latin'],
	weight: ['300', '400', '700', '900'],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={zain.className}>
			<body>
				<AuthProvider>
					<SpotifyPlayerProvider>{children}</SpotifyPlayerProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
