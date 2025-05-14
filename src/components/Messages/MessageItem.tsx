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
	const isUser = message.role === 'user';

	return (
		<div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
			<div
				className={`rounded-lg py-2 ${
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
