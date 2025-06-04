export function removeDuplicates<T extends { id: string }>(items: T[]): T[] {
	const map = new Map<string, T>();
	for (const item of items) {
		if (item?.id && !map.has(item.id)) {
			map.set(item.id, item);
		}
	}
	return Array.from(map.values());
}
