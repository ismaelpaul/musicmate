export function validateAndLimitTrackIds(trackIds: string[]): string[] {
	if (!Array.isArray(trackIds) || trackIds.length === 0) return [];

	if (trackIds.length > 50) {
		console.warn(
			'Spotify Tracks: More than 50 IDs provided, truncating to 50.'
		);
	}

	return trackIds.slice(0, 50);
}
