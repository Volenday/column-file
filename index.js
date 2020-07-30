import React, { memo } from 'react';
import Image from './image';

const Index = ({ fixedWidth, multiple, width, ...defaultProps }) => {
	return {
		...defaultProps,
		disableFilters: true,
		width: fixedWidth ? width : 100,
		Cell: ({ value }) => {
			return <Image multiple={multiple} value={value} />;
		}
	};
};

export default memo(Index);
