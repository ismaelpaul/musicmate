interface UserMessageProps {
	userMessage: string;
}

export function UserMessageComponent({ userMessage }: UserMessageProps) {
	return (
		<p className="whitespace-pre-wrap bg-black rounded-full text-white px-4 py-2">
			{userMessage}
		</p>
	);
}
