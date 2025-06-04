'use client';

import { useEffect, useRef } from 'react';
import { useFormSubmitOnEnter } from '@/hooks/useFormSubmittionOnEnter/useFormSubmittionOnEnter';

type InputProps = {
	inputValue: string;
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
	autoFocus?: boolean;
	disabled?: boolean;
};

export default function Input({
	inputValue,
	setInputValue,
	autoFocus,
	disabled,
}: InputProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleKeyDown = useFormSubmitOnEnter(inputValue, textareaRef);

	const resizeTextarea = () => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = 'auto';
			textarea.style.height = `${textarea.scrollHeight}px`;
			textarea.style.maxHeight = '150px';
		}
	};

	const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
		resizeTextarea();
		setInputValue(e.currentTarget.value);
	};

	useEffect(() => {
		if (autoFocus) {
			textareaRef.current?.focus();
		}
	}, [autoFocus]);

	return (
		<textarea
			ref={textareaRef}
			value={inputValue}
			onKeyDown={handleKeyDown}
			onChange={(e) => handleInput(e)}
			disabled={disabled}
			rows={1}
			placeholder="Type what you want to listen to..."
			className="w-100 pr-12 pl-6 py-3 text-lg bg-white text-gray-800 rounded-full flex-1 resize-none shadow-sm overflow-hidden focus:outline-none focus:ring-2 focus:ring-gray-700"
		></textarea>
	);
}
