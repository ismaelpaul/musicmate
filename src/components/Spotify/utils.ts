export function formatTime(ms: number) {
	const min = Math.floor(ms / 60000);
	const sec = Math.floor((ms % 60000) / 1000)
		.toString()
		.padStart(2, '0');
	return `${min}:${sec}`;
}
