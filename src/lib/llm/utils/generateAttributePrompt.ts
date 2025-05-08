export function generateAttributePrompt(
	tracks: SpotifySeedTrackInfo[]
): string {
	if (!tracks || tracks.length === 0) {
		return '';
	}

	// Format track info for the prompt
	const trackListString = tracks
		.map((t) => `'${t.name}' by ${t.artist}`)
		.join(', ');

	const prompt = `
Analyze the following list of tracks: ${trackListString}.

Based *only* on these tracks, estimate the typical musical attributes. Output ONLY a valid JSON object containing the estimated attributes.

Schema Keys (all should be floats between 0.0 and 1.0, except loudness and tempo):
- energy: float (0.0 = calm, 1.0 = intense)
- danceability: float (0.0 = not danceable, 1.0 = very danceable)
- valence: float (0.0 = sad/negative, 1.0 = happy/positive)
- acousticness: float (0.0 = electronic, 1.0 = acoustic)
- instrumentalness: float (0.0 = vocals present, 1.0 = no vocals)
- liveness: float (0.0 = studio, 1.0 = live audience)
- speechiness: float (0.0 = music, 1.0 = speech)
- loudness: float (-60.0 to 0.0 dB, approximate average)
- tempo: float (BPM, approximate average)

Instructions:
- Provide estimates for energy, danceability, and valence if possible.
- Include other attributes only if you can make a reasonable estimate based on the provided tracks.
- If you cannot make a reasonable estimate for an attribute, OMIT the key entirely.
- Output ONLY the JSON object, no explanations.

Example Output:
{
  "energy": 0.75,
  "danceability": 0.8,
  "valence": 0.7
}

Estimated Attributes JSON Output:
`;
	return prompt;
}
