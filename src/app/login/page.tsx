'use client';

import SpotifyLoginButton from '@/components/Buttons/SpotifyLoginButton';
import Form from '@/components/Form/Form';

export default function Login() {
	return (
		<main className="flex flex-col justify-end min-h-screen">
			<div className="absolute inset-0 z-10 bg-black/20 backdrop-blur-[2px]" />
			<div className="flex flex-col gap-4 absolute inset-0 z-20 items-center justify-center">
				<h1 className="text-3xl text-black">Please login to continue</h1>
				<SpotifyLoginButton />
			</div>
			<div className="w-3xl max-w-3xl p-6 mx-auto">
				<Form autoFocus={false} disabled={true} />
			</div>
		</main>
	);
}
