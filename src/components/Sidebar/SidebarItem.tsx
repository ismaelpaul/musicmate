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
	return (
		<>
			<div className="flex items-center gap-2">
				<item.icon className="w-6 h-6" />
				<span className="font-bold text-xl leading-normal">{item.label}</span>
			</div>
			<div className="w-full">{item.content && <item.content />}</div>
		</>
	);
};
