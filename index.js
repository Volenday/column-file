import React from 'react';
import Image from './image';

const browser = typeof process.browser !== 'undefined' ? process.browser : true;

export default ({ fixedWidth, multiple, width, ...defaultProps }) => {
	return {
		...defaultProps,
		disableFilters: true,
		width: fixedWidth ? width : 100,
		Cell: ({ value }) => {
			return browser ? <Image multiple={multiple} value={value} /> : null;
		}
	};
};
