import { SpotifyArtist } from '@/components/Spotify/types';
import { searchArtists } from '../api/searchArtists';
import { removeDuplicates } from '../utils/removeDuplicates';
import { SpotifyAuthError } from '../errors';

export async function searchSpotifyArtists(
	artists: string[],
	genres: string[],
	token: string,
	limit: number
): Promise<SpotifyArtist[]> {
	if (!token) throw new SpotifyAuthError('Missing Spotify access token');

	const results: SpotifyArtist[] = [];
	const discoveredGenres = new Set<string>(genres);

	// search for artists based on provided artist names
	for (const artist of artists) {
		try {
			const response = await searchArtists(`artist:"${artist}"`, 2, token);
			const bestMatch = response?.artists?.items?.[0];

			if (
				bestMatch &&
				Array.isArray(bestMatch.genres) &&
				bestMatch.genres.length > 0
			) {
				results.push(bestMatch);
				bestMatch.genres.forEach((genre) =>
					discoveredGenres.add(genre.toLowerCase())
				);
			}
		} catch (err) {
			console.warn(`Artist search failed for "${artist}"`, err);
		}
	}

	// collect artists based on discovered genres
	const genreResults: SpotifyArtist[] = [];
	const uniqueGenres = Array.from(discoveredGenres);

	for (const genre of uniqueGenres) {
		try {
			const response = await searchArtists(genre.toLowerCase(), 10, token);

			const items = response?.artists?.items || [];
			genreResults.push(...items);
		} catch (err) {
			console.warn(`Genre search failed for "${genre}"`, err);
		}
	}

	// score artists based on genre overlap
	const genreSet = new Set(uniqueGenres);

	const scored = genreResults
		.map((artist) => {
			const overlap =
				artist?.genres?.filter((genre) => genreSet.has(genre)).length ?? 0;

			return { artist, score: overlap };
		})
		.filter(({ score }) => score >= 2) // only keep artists with significant genre overlap
		.sort((a, b) => b.score - a.score)
		.map(({ artist }) => artist);

	// remove duplicates from results and scored artists
	const allArtists = removeDuplicates([...results, ...scored]).slice(0, limit);

	return allArtists;
}
