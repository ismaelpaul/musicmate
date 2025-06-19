import { LuSendHorizontal } from 'react-icons/lu';
import IconButton from '../Buttons/IconButton';
import Input from '../Inputs/TextAreaInput';

export default function DisabledForm() {
	return (
		<form className="relative w-full flex items-center gap-2">
			<Input
				inputValue=""
				setInputValue={() => {}}
				autoFocus={false}
				disabled={true}
			/>
			<IconButton
				icon={<LuSendHorizontal className="text-gray-300" />}
				className="absolute right-2 cursor-not-allowed text-xl inline-flex items-center justify-center rounded-full p-2 bg-gray-200"
				type="button"
				isDisabled={true}
			/>
		</form>
	);
}
