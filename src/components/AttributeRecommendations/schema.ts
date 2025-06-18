import { z } from 'zod';

export const attributeSchema = z.object({
	artist: z.string().min(1, 'Artist is required'),
	attributes: z.record(z.string(), z.number()),
	recommendationLimit: z
		.number()
		.min(1, 'Recommendation limit must be at least 1')
		.max(20, 'Recommendation limit must not exceed 20'),
});
