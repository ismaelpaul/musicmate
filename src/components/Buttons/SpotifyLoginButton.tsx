'use client';

import Image from 'next/image';

import spotifyWhiteIcon from '../../../public/Primary_Logo_White_RGB.svg';
import IconButton from './IconButton';
import { signIn } from 'next-auth/react';

export default function SpotifyLoginButton() {
	const handleLogin = () => {
		signIn('spotify', { callbackUrl: '/' });
	};

	return (
		<IconButton
			icon={
				<Image
					src={spotifyWhiteIcon}
					width={25}
					height={25}
					alt="Spotify"
					priority
				/>
			}
			className="flex items-center gap-2 p-4 rounded-full bg-black hover:bg-green-spotify cursor-pointer text-2xl"
			onClick={handleLogin}
		>
			<span className="text-white">Login with Spotify</span>
		</IconButton>
	);
}
