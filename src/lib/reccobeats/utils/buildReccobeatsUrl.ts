export const buildReccobeatsUrl = (
	artistIds: string[],
	attributes: Record<string, string | number>,
	recommendationLimit: number
): string => {
	const baseUrl = 'https://api.reccobeats.com/v1/track/recommendation';
	const queryParams = new URLSearchParams();

	queryParams.append('seeds', artistIds.join(','));

	Object.entries(attributes).forEach(([key, value]) => {
		queryParams.append(key, String(value));
	});

	queryParams.append('size', recommendationLimit.toString());

	return `${baseUrl}?${queryParams.toString()}`;
};
