import { ReccobeatsResponse } from '../types';

export function extractSpotifyIdsFromReccoBeats(
	reccoBeatsTracks: ReccobeatsResponse
) {
	const spotifyIdsToFetch: string[] = [];
	for (const track of reccoBeatsTracks.content) {
		try {
			const potentialId = track.href?.split('/').pop()?.split('?')[0];
			if (potentialId?.length === 22) {
				spotifyIdsToFetch.push(potentialId);
			}
		} catch (error) {
			console.warn(`Error parsing href ${track.href}: ${error}`);
		}
	}
	return spotifyIdsToFetch;
}
