import { attributeSchema } from '@/components/AttributeRecommendations/schema';
import { sliderOptions } from '@/components/Slider/sliderOptions';
import { useState } from 'react';

export const useAttributeFormState = () => {
	const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
	const [artist, setArtist] = useState('');
	const [errors, setErrors] = useState<{ artist?: string }>({});
	const [sliderValues, setSliderValues] = useState<Record<string, number>>(() =>
		Object.fromEntries(
			sliderOptions.map((opt) => [opt.id, (opt.min + opt.max) / 2])
		)
	);
	const [recommendationLimit, setRecommendationLimit] = useState<number>(10);

	const handleAttributeToggle = (id: string) => {
		setSelectedAttributes((prev) =>
			prev.includes(id) ? prev.filter((attr) => attr !== id) : [...prev, id]
		);
	};

	const handleSliderChange = (id: string, value: number) => {
		setSliderValues((prev) => ({ ...prev, [id]: value }));
	};

	const validateAndGetPayload = () => {
		const selectedSliders = Object.fromEntries(
			selectedAttributes.map((id) => [id, sliderValues[id]])
		);

		const payload = {
			artist,
			attributes: selectedSliders,
			recommendationLimit: recommendationLimit,
		};

		const result = attributeSchema.safeParse(payload);

		if (!result.success) {
			const fieldErrors = result.error.flatten().fieldErrors;
			setErrors({ artist: fieldErrors.artist?.[0] });
			return null;
		}

		setErrors({});
		return result.data;
	};

	return {
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
	};
};
