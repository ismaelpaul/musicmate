export async function playTrackApi(
	deviceId: string,
	token: string,
	uri: string
) {
	const response = await fetch(
		`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ uris: [uri] }),
		}
	);

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(
			`Failed to play track: ${response.status} ${response.statusText}. ${
				errorData.error?.message || ''
			}`
		);
	}

	return response;
}
