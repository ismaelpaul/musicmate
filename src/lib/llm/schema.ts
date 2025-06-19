import { z } from 'zod';

export const llmSpotifyParamsSchema = z
	.object({
		seed_artists: z.array(z.string()).optional().nullable(),
		seed_genres: z.array(z.string()).optional().nullable(),
		seed_tracks: z.array(z.string()).optional().nullable(),
		target_energy: z.number().min(0.0).max(1.0).optional().nullable(),
		target_danceability: z.number().min(0.0).max(1.0).optional().nullable(),
		target_valence: z.number().min(0.0).max(1.0).optional().nullable(),
		target_instrumentalness: z.number().min(0.0).max(1.0).optional().nullable(),
		target_tempo: z.number().min(0).optional().nullable(),
	})
	.refine(
		(data) => {
			// check total seeds <= 5
			let totalSeeds = 0;
			if (data.seed_artists) totalSeeds += data.seed_artists.length;
			if (data.seed_genres) totalSeeds += data.seed_genres.length;
			if (data.seed_tracks) totalSeeds += data.seed_tracks.length;
			return totalSeeds <= 10;
		},
		{
			message:
				'Total number of seeds (artists + genres + tracks) cannot exceed 10',
		}
	);

export const recommendationRequestSchema = z.object({
	userQuery: z.string().min(1, { message: 'User query cannot be empty' }),
});

export type LLMSpotifyParams = z.infer<typeof llmSpotifyParamsSchema>;
