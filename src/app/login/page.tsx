import Form from '@/components/Form';
import SpotifyLoginButton from '@/components/SpotifyLoginButton';

export default function Login() {
	return (
		<main className="flex flex-col justify-end min-h-screen py-24 px-16 lg:px-56">
			<div className="absolute inset-0 z-10 bg-black/20 backdrop-blur-[2px]" />
			<div className="flex flex-col gap-4 absolute inset-0 z-20 items-center justify-center">
				<h1 className="text-2xl font-bold text-black">
					Please login to continue
				</h1>
				<SpotifyLoginButton />
			</div>
			<div>
				<Form autoFocus={false} disabled={true} />
			</div>
		</main>
	);
}
