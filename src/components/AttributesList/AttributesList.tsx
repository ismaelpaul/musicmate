import { FiInfo } from 'react-icons/fi';
import { Checkbox } from '../Inputs/Checkbox';
import { sliderOptions } from '../Slider/sliderOptions';
import { Tooltip } from '../Tooltip/Tooltip';

type AttributesListProps = {
	selectedAttributes: string[];
	onAttributeToggle: (attribute: string) => void;
};

export const AttributesList = ({
	selectedAttributes,
	onAttributeToggle,
}: AttributesListProps) => {
	return (
		<fieldset>
			<legend className="text-base font-medium text-gray-900 mb-2">
				Select attributes to tune
			</legend>
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
				{sliderOptions.map(({ id, label, description }) => {
					const checkboxLabelWithTooltip = (
						<div className="flex items-center gap-1.5">
							<span>{label}</span>
							<Tooltip text={description}>
								<FiInfo size={16} className="text-gray-500 cursor-help" />
							</Tooltip>
						</div>
					);

					return (
						<Checkbox
							key={id}
							id={`checkbox-${id}`}
							label={checkboxLabelWithTooltip}
							checked={selectedAttributes.includes(id)}
							onChange={() => onAttributeToggle(id)}
						/>
					);
				})}
			</div>
		</fieldset>
	);
};
