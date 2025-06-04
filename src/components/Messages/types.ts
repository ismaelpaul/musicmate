import { RecommendationTrack } from '../Spotify/types';

export interface UserMessage {
	id: string;
	role: 'user';
	content: string;
}

export interface SystemMessage {
	id: string;
	role: 'system';
	status: 'loading' | 'success' | 'error';
	recommendations?: RecommendationTrack[];
	error?: string;
}
