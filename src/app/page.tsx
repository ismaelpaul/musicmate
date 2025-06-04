'use client';

import Form from '@/components/Form/Form';
import Layout from '@/components/Layout/Layout';
import { MessagesList } from '@/components/Messages/MessagesList';
import { SystemMessage, UserMessage } from '@/components/Messages/types';

import { RecommendationTrack } from '@/components/Spotify/types';

import { useCallback, useState } from 'react';

type Messages = UserMessage | SystemMessage;

export default function Home() {
	const [messages, setMessages] = useState<Messages[]>([]);
	console.log('messages', messages);

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
			<div className="flex-1 overflow-y-auto no-scrollbar">
				<MessagesList messages={messages} />
			</div>
			<Form
				onSendMessage={handleSendMessage}
				onResultsReceived={handleResultsReceived}
			/>
		</Layout>
	);
}
