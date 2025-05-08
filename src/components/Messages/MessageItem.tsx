import React from 'react';
import { ChatMessage } from './types';
import { UserMessage } from './UserMessage';
import { SystemMessage } from './SystemMessage';

interface MessageItemProps {
	message: ChatMessage;
}

export const MessageItem = React.memo(function MessageItem({
	message,
}: MessageItemProps) {
	console.log('Memoized MessageItem Render:', message.id || 'no-id');

	const isUser = message.role === 'user';
	console.log(message, '<<<< message');

	return (
		<div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
			<div
				className={`rounded-lg px-4 py-2 ${
					isUser ? 'text-gray' : 'w-3xl text-gray-800'
				}`}
			>
				{isUser ? (
					<UserMessage userMessage={message.content} />
				) : (
					<SystemMessage message={message} />
				)}
			</div>
		</div>
	);
});
