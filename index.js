import React from 'react';
import Image from './image';

export default ({ fixedWidth, multiple, width, ...defaultProps }) => {
	return {
		...defaultProps,
		disableFilters: true,
		width: fixedWidth ? width : 100,
		Cell: ({ value }) => {
			return <Image multiple={multiple} value={value} />;
		}
	};
};
