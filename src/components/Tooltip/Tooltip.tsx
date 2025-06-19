import React, { useState } from 'react';

type TooltipProps = {
	children: React.ReactNode;
	text: string;
	className?: string;
};

export const Tooltip = ({ children, text, className = '' }: TooltipProps) => {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<div
			className="relative inline-block"
			onMouseEnter={() => setIsVisible(true)}
			onMouseLeave={() => setIsVisible(false)}
		>
			{children}

			<div
				className={`
          absolute z-50 p-2 text-sm text-white bg-gray-800 rounded-md shadow-lg
          transition-opacity duration-200 ease-in-out
          w-96
          bottom-full left-1/2 mb-2
          transform -translate-x-1/2
          pointer-events-none 
          ${isVisible ? 'opacity-100' : 'opacity-0'}
          ${className}
        `}
			>
				{text}
			</div>
		</div>
	);
};
