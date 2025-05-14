'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function UserProfile() {
	const { data: session, status } = useSession();

	if (status === 'loading') return <p>Loading...</p>;
	if (status === 'unauthenticated') return <p>No user data available.</p>;
	if (status === 'authenticated' && !session?.user)
		return <p>No user data available.</p>;

	const user = session?.user;

	return (
		<div className="flex items-center justify-end">
			{user?.image && (
				<Image
					width={50}
					height={50}
					src={user.image}
					alt={'User Profile Image'}
					className="w-10 h-10 rounded-full"
				/>
			)}
		</div>
	);
}
