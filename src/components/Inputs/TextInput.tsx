import { FiMusic } from 'react-icons/fi';
type TextInputProps = {
	label: string;
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TextInput = ({
	label,
	placeholder,
	value,
	onChange,
}: TextInputProps) => (
	<div>
		<label className="block text-sm font-medium text-gray-700 mb-1">
			{label}
		</label>
		<div className="relative">
			<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<FiMusic className="text-gray-400" />
			</div>
			<input
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className="block bg-white w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
			/>
		</div>
	</div>
);
