'use client';

import { AttributeRecommendations } from '@/components/AttributeRecommendations/AttributeRecommendations';
import NaturalLanguageForm from '@/components/Form/NaturalLanguageForm';
import Layout from '@/components/Layout/Layout';
import { MessagesList } from '@/components/Messages/MessagesList';
import { SystemMessage, UserMessage } from '@/components/Messages/types';
import { RecommendationList } from '@/components/Recommendations/RecommendationsList';

import { RecommendationTrack } from '@/components/Spotify/types';
import { useSidebarStore } from '@/store/useSidebarStore';

import { useCallback, useState } from 'react';

type Messages = UserMessage | SystemMessage;

export default function Home() {
	const [messages, setMessages] = useState<Messages[]>([]);
	const [attributeRecommendations, setAttributeRecommendations] = useState<
		RecommendationTrack[]
	>([]);

	const isNaturalLanguageSearchEnabled = useSidebarStore(
		(state) => state.isNaturalLanguageSearchEnabled
	);

	// ddd a new message
	const handleSendMessage = useCallback((newMessage: Messages) => {
		setMessages((prevMessages) => [...prevMessages, newMessage]);
	}, []);

	// update system message with results or error
	const handleResultsReceived = useCallback(
		(
			messageId: string,
			recommendations: RecommendationTrack[],
			status: 'success' | 'error',
			error?: string
		) => {
			setMessages((prevMessages) =>
				prevMessages.map((msg) =>
					msg.id === messageId && msg.role === 'system'
						? { ...msg, status, recommendations, error }
						: msg
				)
			);
		},
		[]
	);

	return (
		<Layout>
			{/* main content */}
			{isNaturalLanguageSearchEnabled ? (
				<>
					<div className="flex-1 overflow-y-auto no-scrollbar">
						<MessagesList messages={messages} />
					</div>
					<NaturalLanguageForm
						onSendMessage={handleSendMessage}
						onResultsReceived={handleResultsReceived}
					/>
				</>
			) : (
				<div className="flex justify-between">
					<AttributeRecommendations
						setAttributeRecommendations={setAttributeRecommendations}
					/>
					{attributeRecommendations.length > 0 && (
						<div className="min-w-4 max-h-[80vh] overflow-y-auto no-scrollbar">
							<RecommendationList
								recommendationTracks={attributeRecommendations}
							/>
						</div>
					)}
				</div>
			)}
		</Layout>
	);
}
