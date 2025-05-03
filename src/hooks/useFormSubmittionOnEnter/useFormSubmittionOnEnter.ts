import { RefObject } from 'react';

export function useFormSubmitOnEnter(
	value: string,
	inputRef: RefObject<HTMLTextAreaElement | null>
) {
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			if (!value.trim()) return;

			const form = inputRef.current?.closest('form');
			form?.requestSubmit();
		}
	};

	return handleKeyDown;
}
