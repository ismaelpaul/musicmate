import { Loader2 } from 'lucide-react';
import { ChatMessage } from './types';
import { RecommendationList } from '../Recommendations/RecommendationsList';

interface SystemMessageProps {
	message: ChatMessage;
}

export function SystemMessage({ message }: SystemMessageProps) {
	if (message.status === 'loading') {
		return (
			<div className="flex items-center gap-2 text-gray-600">
				<Loader2 className="animate-spin h-4 w-4" />
				<span>Finding recommendations...</span>
			</div>
		);
	}

	if (message.status === 'error') {
		return (
			<p className="text-red-600">
				{message.error || 'Could not get recommendations.'}
			</p>
		);
	}

	if (message.status === 'success') {
		if (!message.recommendations || message.recommendations.length === 0) {
			return <p>No specific recommendations found for that.</p>;
		}
		return <RecommendationList tracks={message.recommendations} />;
	}

	return null;
}
