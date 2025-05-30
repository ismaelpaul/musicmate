export interface ReccobeatsReponseObj {
	id: string;
	trackTitle: string;
	artists: ReccobeatsArtistsResponse[];
	duration: number;
	isrc: number;
	ean: unknown;
	upc: unknown;
	href: string;
	availableCountries: string;
	popularity: number;
}

export interface ReccobeatsResponse {
	content: ReccobeatsReponseObj[];
}

export interface ReccobeatsArtistsResponse {
	id: string;
	name: string;
	href: string;
}
