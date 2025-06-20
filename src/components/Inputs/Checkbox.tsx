type CheckboxProps = {
	id: string;
	label: React.ReactNode;
	checked: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox = ({ id, label, checked, onChange }: CheckboxProps) => (
	<div className="flex items-center">
		<input
			id={id}
			name={id}
			type="checkbox"
			checked={checked}
			onChange={onChange}
			className="h-4 w-4 accent-black border-gray-300 rounded focus:ring-black focus:ring-1 cursor-pointer"
		/>
		<label htmlFor={id} className="ml-2 block text-sm text-gray-900">
			{label}
		</label>
	</div>
);
