'use client';

import { useEffect, useRef } from 'react';
import { useFormSubmitOnEnter } from '@/hooks/useFormSubmittionOnEnter';

type InputProps = {
	message: string;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
};

export default function Input({ message, setMessage }: InputProps) {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	const handleKeyDown = useFormSubmitOnEnter(message, textareaRef);

	const resizeTextarea = () => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = 'auto';
			textarea.style.maxHeight = '150px';
		}
	};

	const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
		resizeTextarea();
		setMessage(e.currentTarget.value);
	};

	useEffect(() => {
		textareaRef.current?.focus();
	}, []);

	return (
		<textarea
			ref={textareaRef}
			value={message}
			onInput={handleInput}
			onKeyDown={handleKeyDown}
			onChange={(e) => setMessage(e.target.value)}
			rows={1}
			placeholder="Type what you want to listen to..."
			className="w-100 pr-12 pl-6 py-3 bg-gray-100 rounded-full flex-1 resize-none shadow-sm overflow-hidden focus:outline-none focus:ring-2 focus:ring-gray-700"
		></textarea>
	);
}
