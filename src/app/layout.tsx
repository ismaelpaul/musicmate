import type { Metadata } from 'next';
import './globals.css';
import { Zain } from 'next/font/google';

import { Providers } from './providers';

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
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
