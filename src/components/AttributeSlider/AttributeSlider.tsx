import React from 'react';
import { sliderOptions } from '../Slider/sliderOptions';
import { Slider } from '../Inputs/Slider';

interface Props {
	selectedAttributes: string[];
	sliderValues: Record<string, number>;
	onChange: (id: string, value: number) => void;
}

export const AttributeSliders: React.FC<Props> = ({
	selectedAttributes,
	sliderValues,
	onChange,
}) => {
	const activeSliders = sliderOptions.filter((opt) =>
		selectedAttributes.includes(opt.id)
	);

	if (activeSliders.length === 0) return null;

	return (
		<div className="border-t border-gray-200 pt-6">
			<ul className="grid grid-cols-2 gap-8">
				{activeSliders.map(({ id, label, min, max, step }) => (
					<li key={id}>
						<Slider
							id={id}
							label={label}
							value={sliderValues[id]}
							onChange={(val) => onChange(id, val)}
							min={min}
							max={max}
							step={step}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};
