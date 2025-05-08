import { RecommendationTrack } from '../Spotify/types';

export interface ChatMessage {
	id: string;
	role: 'user' | 'system';
	content: string;
	status?: 'loading' | 'success' | 'error';
	error?: string;
	recommendations?: RecommendationTrack[];
}
