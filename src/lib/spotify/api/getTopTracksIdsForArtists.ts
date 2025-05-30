export async function getTopTracksIdsForArtists(
	artistIds: string[],
	token: string
) {
	const trackIds = [];

	for (const artistId of artistIds) {
		const response = await fetch(
			`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!response.ok) continue;

		const data = await response.json();
		const topTrack = data.tracks?.[0];

		if (topTrack?.id) {
			trackIds.push(topTrack.id);
		}
	}

	return trackIds;
}
