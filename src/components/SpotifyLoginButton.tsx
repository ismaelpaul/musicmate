'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import spotifyWhiteIcon from '../../public/Primary_Logo_White_RGB.svg';

import IconButton from './IconButton';

export default function SpotifyLoginButton() {
	const router = useRouter();

	const handleLogin = () => {
		router.push('/api/login');
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
			className="gap-2 px-3 font-bold bg-black hover:bg-green-spotify cursor-pointer"
			onClick={handleLogin}
		>
			<span className="text-white">Login with Spotify</span>
		</IconButton>
	);
}
