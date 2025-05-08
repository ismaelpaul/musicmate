import { useEffect, useRef } from 'react';
import { MessageItem } from './MessageItem';
import { ChatMessage } from './types';

interface MessagesListProps {
	messages: ChatMessage[];
}

export function MessagesList({ messages }: MessagesListProps) {
	const messagesEndRef = useRef<null | HTMLDivElement>(null);

	useEffect(() => {
		console.log('rerendered messages list');

		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	if (!messages || messages.length === 0) {
		return (
			<>
				<div className="flex-grow flex items-center justify-center text-gray-400">
					Ask for some music recommendations to get started!
				</div>
				<div ref={messagesEndRef} />
			</>
		);
	}

	return (
		<div className="space-y-4 pr-4 pb-4">
			{messages.map((msg, idx) => (
				<MessageItem key={idx} message={msg} />
			))}

			<div ref={messagesEndRef} />
		</div>
	);
}
