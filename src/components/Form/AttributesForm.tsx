import React, { useState } from 'react';
import { TextInput } from '../Inputs/TextInput';
import { AttributesList } from '../AttributesList/AttributesList';
import IconButton from '../Buttons/IconButton';
import { AttributeSliders } from '../AttributeSlider/AttributeSlider';
import { useAttributeFormState } from '@/hooks/useAttributesFormState/useAttributesFormState';
import { Slider } from '../Inputs/Slider';
import { RecommendationTrack } from '../Spotify/types';
import { LuLoaderCircle } from 'react-icons/lu';

type AttributesFormProps = {
	setAttributeRecommendations: (recommendations: RecommendationTrack[]) => void;
};

export const AttributesForm = ({
	setAttributeRecommendations,
}: AttributesFormProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const {
		artist,
		setArtist,
		errors,
		selectedAttributes,
		handleAttributeToggle,
		sliderValues,
		handleSliderChange,
		validateAndGetPayload,
		setRecommendationLimit,
		recommendationLimit,
	} = useAttributeFormState();

	const handleSubmit = async (e: React.FormEvent) => {
		setIsLoading(true);
		e.preventDefault();
		const payload = validateAndGetPayload();

		if (!payload) return;

		try {
			const res = await fetch('/api/attribute-recommendations', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});
			const data = await res.json();
			setAttributeRecommendations(data.recommendations || []);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			console.error('Error:', err);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-6 max-h-[80vh] overflow-y-auto no-scrollbar"
		>
			<AttributesList
				selectedAttributes={selectedAttributes}
				onAttributeToggle={handleAttributeToggle}
			/>

			<AttributeSliders
				selectedAttributes={selectedAttributes}
				sliderValues={sliderValues}
				onChange={handleSliderChange}
			/>

			<div className="grid grid-cols-2 gap-8">
				<TextInput
					label="Artist"
					placeholder="e.g., Daft Punk"
					value={artist}
					onChange={(e) => setArtist(e.target.value)}
					error={errors.artist}
				/>

				<Slider
					id={'recommendation_limit'}
					label={'Recommendations'}
					min={1}
					max={20}
					value={recommendationLimit}
					onChange={(value) => setRecommendationLimit(value)}
					step={1}
				/>
			</div>
			{isLoading ? (
				<div className="flex items-center gap-2 text-gray-600">
					<LuLoaderCircle className="animate-spin h-4 w-4" />
					<span>Finding recommendations...</span>
				</div>
			) : (
				<IconButton
					type="submit"
					icon={`${isLoading ? 'Loading..' : 'Get Recommendations'}`}
					className="px-4 py-2 bg-black rounded-full text-white dark:text-black dark:bg-gray-300 hover:bg-green-spotify"
				/>
			)}
		</form>
	);
};
