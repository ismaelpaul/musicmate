'use client';

import { useFetchUser } from '@/hooks/useFetchUser/useFetchUser';
import { createContext } from 'react';

interface UserImage {
	url: string;
	width: number;
	height: number;
}

interface User {
	display_name: string;
	email: string;
	images: UserImage[];
	id: string;
	uri: string;
	href: string;
	external_urls: {
		spotify: string;
	};
}

export interface AuthContextValue {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	error: boolean;
}

export const AuthContext = createContext<AuthContextValue>({
	user: null,
	isLoading: true,
	isAuthenticated: false,
	error: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const { user, isLoading, error } = useFetchUser();

	const value = {
		user: user ?? null,
		isLoading,
		isAuthenticated: !!user,
		error,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
