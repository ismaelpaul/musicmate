import React from 'react';

interface SliderProps {
	id: string;
	label: React.ReactNode;
	value: number;
	onChange: (value: number) => void;
	description?: string;
	min?: number;
	max?: number;
	className?: string;
	step?: number;
}

export function Slider({
	id,
	label,
	value,
	onChange,
	min = 0,
	max = 1,
	step = 0.1,
}: SliderProps) {
	return (
		<div className="lg:max-w-64">
			<div className="flex justify-between items-center">
				<label htmlFor={id} className="text-sm font-medium text-gray-700">
					{label}
				</label>
				<span className="text-lg font-bold text-black">{value}</span>
			</div>
			<input
				id={id}
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(e) => onChange(parseFloat(e.target.value))}
				className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
			/>
		</div>
	);
}
