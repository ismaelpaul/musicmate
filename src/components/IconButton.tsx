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
	return (
		<button
			disabled={isDisabled}
			aria-disabled={isDisabled}
			className={`inline-flex items-center justify-center rounded-full p-2 transition-colors duration-300 ease-in-out ${className}`}
			{...props}
		>
			{icon}
			{children}
		</button>
	);
}
