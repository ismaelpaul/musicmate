import Image from 'next/image';
import spotifyWhiteIcon from '../../public/Primary_Logo_White_RGB.svg';
import IconButton from './IconButton';

export default function SpotifyLoginButton() {
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
			className="absolute top-5 right-5 gap-2 px-3 bg-black hover:bg-green-spotify"
		>
			<span className="text-white">Login with Spotify</span>
		</IconButton>
	);
}
