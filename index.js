import React, { memo } from 'react';
import Image from './image';

const Index = ({ fixedWidth, multiple, width, ...defaultProps }) => {
	return {
		...defaultProps,
		disableFilters: true,
		width: fixedWidth ? width : 100,
		Cell: ({ column, value }) => {
			return <Image column={column} multiple={multiple} value={value} />;
		}
	};
};

export default memo(Index);
