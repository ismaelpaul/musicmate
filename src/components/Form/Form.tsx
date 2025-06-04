'use client';

import { useState } from 'react';
import { RecommendationTrack } from '../Spotify/types';
import { SystemMessage, UserMessage } from '../Messages/types';

import IconButton from '../Buttons/IconButton';
import Input from '../Input/Input';

import { LuSendHorizontal } from 'react-icons/lu';
import { useSidebarStore } from '@/store/useSidebarStore';
import { v4 as uuidv4 } from 'uuid';

interface FormProps {
	autoFocus?: boolean;
	disabled?: boolean;
	onSendMessage: (message: UserMessage | SystemMessage) => void;
	onResultsReceived: (
		messageId: string,
		recommendations: RecommendationTrack[],
		status: 'success' | 'error',
		error?: string
	) => void;
}

export default function Form({
	autoFocus = true,
	disabled = false,
	onSendMessage,
	onResultsReceived,
}: FormProps) {
	const [inputValue, setInputValue] = useState<string>('');

	const { recommendationLimit } = useSidebarStore.getState();

	const isDisabled = inputValue.trim() === '';

	const uniqueId = uuidv4();

	const userMessageId = `${uniqueId}-user`;
	const systemMessageId = `${uniqueId}-system`;

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isDisabled) return;

		// send user message
		const userMessage: UserMessage = {
			id: userMessageId,
			role: 'user',
			content: inputValue,
		};
		onSendMessage(userMessage);

		// loading state for system message
		onSendMessage({
			id: systemMessageId,
			role: 'system',
			status: 'loading',
		});
		setInputValue('');

		// fetch recommendations
		try {
			const response = await fetch('/api/recommendations', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userQuery: inputValue, recommendationLimit }),
			});

			const data = await response.json();

			if (!response.ok) {
				console.error('API Error:', data);
				throw new Error(
					data.error || `API request failed with status ${response.status}`
				);
			}

			const tracks = data.recommendations ?? [];

			// update system message with track results
			onResultsReceived(
				systemMessageId,
				tracks as RecommendationTrack[],
				'success'
			);
		} catch (error) {
			console.error('Failed to get recommendations:', error);

			const errorMessage =
				error instanceof Error
					? error.message
					: 'Failed to fetch recommendations.';

			// update system message with error
			onResultsReceived(systemMessageId, [], 'error', errorMessage);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="relative w-full flex items-center gap-2"
		>
			<input
				type="hidden"
				name="recommendationLimit"
				value={recommendationLimit}
			/>
			<Input
				inputValue={inputValue}
				setInputValue={setInputValue}
				autoFocus={autoFocus}
				disabled={disabled}
			/>
			<IconButton
				icon={
					<LuSendHorizontal
						className={`${isDisabled ? 'text-gray-300' : 'text-white'}`}
					/>
				}
				className={`absolute right-2 cursor-pointer text-xl inline-flex items-center justify-center rounded-full p-2 ${
					isDisabled ? 'bg-gray-200' : 'bg-black hover:bg-green-spotify'
				}`}
				type="submit"
				isDisabled={isDisabled}
			/>
		</form>
	);
}
