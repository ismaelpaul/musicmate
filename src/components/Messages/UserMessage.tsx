interface UserMessageProps {
	userMessage: string;
}

export function UserMessage({ userMessage }: UserMessageProps) {
	return <p className="whitespace-pre-wrap">{userMessage}</p>;
}
