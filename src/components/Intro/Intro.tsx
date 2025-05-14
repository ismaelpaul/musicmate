import { useTypingEffect } from '@/hooks/useTypingEffect/useTypingEffect';
import { useSession } from 'next-auth/react';

export default function Intro() {
	const { data: session } = useSession();
	const firstName = session?.user?.name?.split(' ')[0];

	const hints = [
		`"Give me some sad acoustic songs with the same vibe as Neil Young"`,
		`"Play something upbeat like Dua Lipa"`,
		`"Find jazzy tracks that feel like a rainy night in New York"`,
		`"I want energetic songs like James Brown"`,
		`"Give me calm piano instrumentals for studying"`,
	];
	const typedHint = useTypingEffect(hints, 50, 2000);

	return (
		<>
			<div className="flex-grow flex flex-col items-center justify-center text-black text-center">
				<h1 className="text-5xl mb-2">Hi {firstName}</h1>
				<p className="text-3xl mb-4 font-light">
					Feeling groovy, gloomy, or somewhere in between? Let’s find your
					sound.
				</p>
				<p className="text-3xl font-light italic">
					e.g. <span>{typedHint}</span>
					<span className="animate-pulse">|</span>
				</p>
			</div>
		</>
	);
}
