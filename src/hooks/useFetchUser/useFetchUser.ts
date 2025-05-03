'use client';

import { useEffect, useState } from 'react';
import { SpotifyUserProfile } from './types';
import { useRouter } from 'next/navigation';

export function useFetchUser() {
	const [user, setUser] = useState<SpotifyUserProfile | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const router = useRouter();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await fetch('/api/u	ser');

				if (res.status === 401) {
					router.push('/login');
					return;
				}

				if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status}`);

				const data: SpotifyUserProfile = await res.json();
				setUser(data);
			} catch (err: any) {
				setError(err.message || 'Unknown error');
			} finally {
				setIsLoading(false);
			}
		};

		fetchUser();
	}, []);

	return { user, isLoading, error };
}
