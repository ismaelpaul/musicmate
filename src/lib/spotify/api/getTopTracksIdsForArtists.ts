export async function getTopTracksIdsForArtists(
	artistIds: string[] | string,
	token: string,
	options?: { limit?: number }
): Promise<string[]> {
	const ids: string[] = [];

	const artistIdList = Array.isArray(artistIds) ? artistIds : [artistIds];
	const limit = options?.limit ?? 1;

	for (const artistId of artistIdList) {
		const response = await fetch(
			`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=from_token`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch top tracks for artist ${artistId}. Status: ${response.status}`
			);
		}

		const data = await response.json();
		const tracks = data.tracks?.slice(0, limit) || [];

		for (const track of tracks) {
			if (track?.id) {
				ids.push(track.id);
			}
		}
	}

	return ids;
}
