import React from 'react';
import Image from './image';

export default props => {
	const { fixedWidth, headerStyle = {}, multiple, style = {}, width, ...defaultProps } = props;

	return {
		...defaultProps,
		filterable: false,
		width: fixedWidth ? width : 100,
		style: { ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' },
		headerStyle: {
			...headerStyle,
			display: 'flex',
			alignItems: 'center'
		},
		Cell: ({ column, value }) => {
			return <Image column={column} multiple={multiple} value={value} />;
		}
	};
};
