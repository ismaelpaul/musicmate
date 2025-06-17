export const sliderOptions = [
	{
		id: 'acousticness',
		label: 'Acousticness',
		description:
			'Measures how acoustic a track sounds. Higher values suggest more natural, organic instrumentation.',
		min: 0,
		max: 1,
		step: 0.1,
	},
	{
		id: 'danceability',
		label: 'Danceability',
		description:
			'Indicates how suitable a track is for dancing, based on tempo, rhythm, and beat.',
		min: 0,
		max: 1,
		step: 0.1,
	},
	{
		id: 'energy',
		label: 'Energy',
		description:
			'Represents the intensity and activity of a track. Higher values = more energetic.',
		min: 0,
		max: 1,
		step: 0.1,
	},
	{
		id: 'instrumentalness',
		label: 'Instrumentalness',
		description:
			'Estimates likelihood of no vocals. Values closer to 1 suggest instrumental tracks.',
		min: 0,
		max: 1,
		step: 0.1,
	},
	{
		id: 'liveness',
		label: 'Liveness',
		description:
			'Detects presence of an audience. Higher values suggest live performance.',
		min: 0,
		max: 1,
		step: 0.1,
	},
	{
		id: 'loudness',
		label: 'Loudness',
		description:
			'Overall loudness in decibels (dB). Ranges from very quiet (-60 dB) to very loud (0 dB).',
		min: -60,
		max: 2,
		step: 1,
	},
	{
		id: 'mode',
		label: 'Mode',
		description: 'Indicates major (1) or minor (0) key of the track.',
		min: 0,
		max: 1,
		step: 1,
	},
	{
		id: 'speechiness',
		label: 'Speechiness',
		description:
			'Measures spoken word content. Higher values mean more speech-like audio.',
		min: 0,
		max: 1,
		step: 0.1,
	},
	{
		id: 'tempo',
		label: 'Tempo',
		description: 'Estimated tempo in beats per minute (BPM).',
		min: 0,
		max: 250,
		step: 1,
	},
	{
		id: 'valence',
		label: 'Valence',
		description:
			'Measures musical positivity. Higher values sound happier or more cheerful.',
		min: 0,
		max: 1,
		step: 0.1,
	},
	{
		id: 'popularity',
		label: 'Popularity',
		description: 'A score from 0–100 showing how popular the track is.',
		min: 0,
		max: 100,
		step: 1,
	},
];
