import { ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: ReactNode;
	isDisabled?: boolean;
}

export default function IconButton({
	icon,
	isDisabled,
	children,
	className = '',
	...props
}: IconButtonProps) {
	const baseStyles =
		' transition-colors duration-300 ease-in-out cursor-pointer';

	return (
		<button
			disabled={isDisabled}
			aria-disabled={isDisabled}
			className={`${baseStyles} ${className}`}
			{...props}
		>
			{icon}
			{children}
		</button>
	);
}
