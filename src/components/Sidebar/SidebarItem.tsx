import { useSidebarStore } from '@/store/useSidebarStore';
import React from 'react';

interface SidebarItem {
	id: string;
	label: string;
	icon: React.ElementType;
	content?: React.ElementType;
}

interface SidebarItemProps {
	item: SidebarItem;
}

export const SidebarItem = ({ item }: SidebarItemProps) => {
	const { isExpanded } = useSidebarStore();

	const animationBase = 'transition-all duration-100 ease-in-out transform';
	const collapsedStyles =
		'opacity-0 scale-95 pointer-events-none select-none invisible hidden';

	const expandedStyles = 'opacity-100 scale-100 visible';

	const labelClasses = `
		font-bold text-xl leading-normal origin-left
		${animationBase}
		${isExpanded ? expandedStyles : collapsedStyles}
	`;

	const contentClasses = `
		origin-top
		${animationBase}
		${isExpanded ? expandedStyles : collapsedStyles}
	`;

	return (
		<>
			<div className="flex items-center gap-2">
				<item.icon className="w-6 h-6" />
				<span className={labelClasses}>{item.label}</span>
			</div>
			<div className={contentClasses}>{item.content && <item.content />}</div>
		</>
	);
};
