import React from 'react';
import { ChatMessage } from './types';
import { UserMessageComponent } from './UserMessage';
import { SystemMessageComponent } from './SystemMessage';

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
					isUser ? 'text-gray' : 'md:w-full lg:w-3xl text-gray-800'
				}`}
			>
				{isUser ? (
					<UserMessageComponent userMessage={message.content} />
				) : (
					<SystemMessageComponent message={message} />
				)}
			</div>
		</div>
	);
});
