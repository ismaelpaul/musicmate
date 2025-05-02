'use client';

import { SendHorizontal } from 'lucide-react';
import IconButton from './IconButton';
import Input from './Input';
import { useState } from 'react';

export default function Form() {
	const [message, setMessage] = useState<string>('');

	const isDisabled = message.trim() === '';

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		if (!message.trim()) return;

		e.preventDefault();

		setMessage('');
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="relative w-full flex items-center gap-2"
		>
			<Input message={message} setMessage={setMessage} />
			<IconButton
				icon={
					<SendHorizontal
						className={`${isDisabled ? 'text-gray-300' : 'text-white'}`}
					/>
				}
				className={`absolute right-2 ${
					isDisabled ? 'bg-gray-200' : 'bg-black hover:bg-green-spotify'
				}`}
				type="submit"
				isDisabled={isDisabled}
			/>
		</form>
	);
}
