import React from 'react';
import { AttributesForm } from '../Form/AttributesForm';
import { RecommendationTrack } from '../Spotify/types';

type AttributesProps = {
	setAttributeRecommendations: (recommendations: RecommendationTrack[]) => void;
};

export const AttributeRecommendations = ({
	setAttributeRecommendations,
}: AttributesProps) => {
	return (
		<AttributesForm setAttributeRecommendations={setAttributeRecommendations} />
	);
};
