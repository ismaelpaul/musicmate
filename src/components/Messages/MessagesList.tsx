import { useEffect, useRef } from 'react';
import { MessageItem } from './MessageItem';

import Intro from '../Intro/Intro';
import { SystemMessage, UserMessage } from './types';

interface MessagesListProps {
	messages: (UserMessage | SystemMessage)[];
}

export function MessagesList({ messages }: MessagesListProps) {
	const messagesEndRef = useRef<null | HTMLDivElement>(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	if (!messages || messages.length === 0) {
		return <Intro />;
	}

	return (
		<div>
			{messages.map((msg, idx) => (
				<MessageItem key={idx} message={msg} />
			))}

			<div ref={messagesEndRef} />
		</div>
	);
}
