import { useEffect, useState } from 'react';

export function useTypingEffect(
	texts: string[],
	typingSpeed = 50,
	pause = 1000
) {
	const [displayText, setDisplayText] = useState('');
	const [textIndex, setTextIndex] = useState(0);
	const [charIndex, setCharIndex] = useState(0);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		const currentText = texts[textIndex];

		let timeout: NodeJS.Timeout;

		if (!deleting && charIndex <= currentText.length) {
			timeout = setTimeout(() => {
				setDisplayText(currentText.substring(0, charIndex));
				setCharIndex((prev) => prev + 1);
			}, typingSpeed);
		} else if (deleting && charIndex >= 0) {
			timeout = setTimeout(() => {
				setDisplayText(currentText.substring(0, charIndex));
				setCharIndex((prev) => prev - 1);
			}, typingSpeed / 2);
		} else if (!deleting && charIndex > currentText.length) {
			timeout = setTimeout(() => {
				setDeleting(true);
			}, pause);
		} else if (deleting && charIndex < 0) {
			setDeleting(false);
			setTextIndex((prev) => (prev + 1) % texts.length);
			setCharIndex(0);
		}

		return () => clearTimeout(timeout);
	}, [charIndex, deleting, texts, textIndex, typingSpeed, pause]);

	return displayText;
}
