import Form from '@/components/Form';
import SpotifyLoginButton from '@/components/SpotifyLoginButton';

export default function Home() {
	return (
		<main className="flex flex-col justify-end min-h-screen py-24 px-16 lg:px-56">
			<SpotifyLoginButton />
			<Form />
		</main>
	);
}
