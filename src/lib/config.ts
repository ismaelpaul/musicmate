// helper function for parsing boolean env vars
function parseBooleanEnv(
	envVar: string | undefined,
	defaultValue: boolean
): boolean {
	if (envVar === undefined) {
		return defaultValue;
	}
	return envVar.toLowerCase() === 'true';
}

// determine llm provider
const llmProvider = (process.env.LLM_PROVIDER || 'groq').toLowerCase();

const defaultJsonMode = llmProvider === 'groq';

// determine default model based on provider
const defaultModel = llmProvider === 'groq' ? 'llama-3.1-8b-instant' : 'gpt-4';

//  main configuration
export const config = {
	apiV1Str: '/api/v1',

	llmProvider: llmProvider,
	llmApiUrl: process.env.LLM_API_URL,
	llmApiKey: process.env.LLM_API_KEY,
	llmModel: process.env.LLM_MODEL || defaultModel,
	llmTemperature: parseFloat(process.env.LLM_TEMPERATURE || '0.5'),
	llmSupportsJsonMode: parseBooleanEnv(
		process.env.LLM_SUPPORTS_JSON_MODE,
		defaultJsonMode
	),

	// spotify configuration
	spotifyApiUrl: 'https://api.spotify.com/v1',
	spotifyAccountUrl: 'https://accounts.spotify.com',
	spotifyRecsEndpoint: '/recommendations',
	spotifySearchEndpoint: '/search',
	spotifyTokenEndpoint: '/api/token',
	spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
	spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
	spotifyRedirectUri: process.env.SPOTIFY_REDIRECT_URI,
};

// validation for required environment variables
const requiredEnvVars: (keyof typeof config)[] = [
	'llmApiUrl',
	'llmApiKey',
	'spotifyClientId',
	'spotifyClientSecret',
	'spotifyRedirectUri',
];

const missingVars = requiredEnvVars.filter((key) => !config[key]);

if (missingVars.length > 0) {
	// throw an error during server startup if required variables are missing
	const missingEnvKeys = missingVars.map((key) => {
		if (key === 'llmApiUrl') return 'LLM_API_URL';
		if (key === 'llmApiKey') return 'LLM_API_KEY';
		if (key === 'spotifyClientId') return 'SPOTIFY_CLIENT_ID';
		if (key === 'spotifyClientSecret') return 'SPOTIFY_CLIENT_SECRET';
		if (key === 'spotifyRedirectUri') return 'SPOTIFY_REDIRECT_URI';
		return key.toUpperCase();
	});
	throw new Error(
		`Missing required environment variables: ${missingEnvKeys.join(
			', '
		)}. Please check your .env.local file.`
	);
}

// validate temperature is a number
if (isNaN(config.llmTemperature)) {
	console.warn(
		`Invalid LLM_TEMPERATURE provided (must be a number), using default 0.5.`
	);
	config.llmTemperature = 0.3;
}

console.log('Configuration loaded successfully.');
console.log(`LLM Provider configured: ${config.llmProvider}`);
