'use client';

import { useAuth } from '@/hooks/useAuth/useAuth';

import Image from 'next/image';

export default function UserProfile() {
	const { user, isLoading, error } = useAuth();

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;
	if (!user) return <p>No user data available.</p>;

	return (
		<div className="flex items-center gap-4">
			{user.images[1]?.url && (
				<Image
					width={user.images[1].width}
					height={user.images[1].height}
					src={user.images[1].url}
					alt={'User Profile Image'}
					className="w-12 h-12 rounded-full"
				/>
			)}
			<div>
				<p className="font-semibold">{user.display_name}</p>
			</div>
		</div>
	);
}
