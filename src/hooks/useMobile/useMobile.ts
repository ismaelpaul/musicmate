import { useState, useEffect } from 'react';

export const useMobile = () => {
	const [screenSize, setScreenSize] = useState({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		const handleResize = () => {
			setScreenSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const isMobile: boolean = screenSize.width < 768;

	return isMobile;
};
