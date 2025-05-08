export function generatePrompt(userQuery: string) {
	const prompt = `
Analyze the user music request and output ONLY a valid JSON object matching the following schema.

Schema Keys (all optional):
- seed_artists: list[string] (Spotify Artist IDs or Names)
- seed_genres: list[string] (Valid Spotify genre seeds) 
- seed_tracks: list[string] (Spotify Track IDs or Names)
- target_energy: float (0.0 to 1.0)
- target_danceability: float (0.0 to 1.0)
- target_valence: float (0.0 to 1.0)
- target_instrumentalness: float (0.0 to 1.0)
- target_tempo: float (target BPM)
- target_acousticness: float (0.0 to 1.0)
- target_liveness: float (0.0 to 1.0)
- target_speechiness: float (0.0 to 1.0)
- target_loudness: int (-60 to 2npm  dB)


Constraints:
- Extract target attributes based on qualitative descriptions (e.g., "sad", "energetic").
- *** If the user query describes a mood or style but doesn't mention specific genres, INFER 1-3 relevant Spotify genre seeds based on the description (e.g., "sad songs" might map to ["acoustic", "sad", "singer-songwriter"], "upbeat workout music" might map to ["pop", "electronic", "dance"]). ***
- If specific artists/genres ARE mentioned, prioritize those.
- If the user input is nonsensical, meaningless, or lacks musical context (e.g., "asdjkl", "???"), output an empty JSON object: {}
- If the user provides only artists or genres, infer typical target_energy, target_danceability, and target_valence values associated with those artists/genres."

// --- Examples ---
// User Request: "Play some really happy electronic dance music like Disclosure."
// JSON Output:
// {
//   "seed_artists": ["Disclosure"],
//   "seed_genres": ["house", "uk-garage", "dance"],
//   "target_valence": 0.8,
//   "target_energy": 0.7,
//   "target_danceability": 0.7
// }
// User Request: "sad songs"
// JSON Output:
// {
//   "seed_genres": ["acoustic", "sad"],
//   "target_energy": 0.3,
//   "target_valence": 0.2
//   "target_instrumentalness": 0.7 // Could be high if instrumental if its a instrumental song
// }
// User Request: "Instrumental study music, maybe some classical guitar"
// JSON Output:
// {
//   "seed_genres": ["classical guitar", "instrumental", "focus"],
//   "target_instrumentalness": 0.9, // High instrumentalness
//   "target_energy": 0.3,
//   "target_valence": 0.5
// }
// --- End Examples ---

Actual User Request: "${userQuery}"
JSON Output:
`;
	return prompt;
}
