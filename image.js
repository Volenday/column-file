import React, { memo, useState } from 'react';
import GenerateThumbnail from '@volenday/generate-thumbnail';
import prettyBytes from 'pretty-bytes';
import { Popover, Spin } from 'antd';
import { Img } from 'react-image';

import './styles.css';

const Image = ({ multiple, value = [] }) => {
	const [selected, setSelected] = useState(null);
	const [visible, setVisible] = useState(null);

	const renderMultiple = () => {
		const newValue = value.slice(0, 2);

		return (
			<>
				{newValue.map((d, i) => {
					return (
						<a
							href="#"
							key={`preview-${d.fileName}-${i}`}
							onClick={e => {
								setSelected(d);
								setVisible(true);
								e.preventDefault();
							}}
							style={{ marginRight: 3 }}>
							{Loader({ src: d, height: '30px', width: 'auto' })}
						</a>
					);
				})}

				{value.length >= 3 && (
					<Popover
						content={
							<div class="multipleContainer clearfix">
								{value.map((d, i) => {
									return (
										<a
											key={`all-${d.fileName}${i}`}
											href="#"
											onClick={e => {
												setSelected(d);
												setVisible(true);
												e.preventDefault();
											}}>
											{Loader({ src: d, height: '30px', width: 'auto' })}
										</a>
									);
								})}
							</div>
						}
						trigger="click"
						title="More Images">
						<a title="View More Images">
							<i class="fas fa-external-link-alt" />
						</a>
					</Popover>
				)}
			</>
		);
	};

	const Loader = props => {
		if (!props.src.url) return null;
		const value = GenerateThumbnail(props.src.url);

		return (
			<Img
				src={[
					value.url,
					'https://s3-ap-southeast-1.amazonaws.com/images.aha.volenday.com/production/defaults/image.jpg'
				]}
				loader={<Spin />}
				style={{ width: 'auto', height: '30px', maxwidth: '100%' }}
			/>
		);
	};

	const Preview = () => {
		if (!selected || !visible) return null;

		return (
			<Popover
				content={
					<a href={selected.url} target="_blank">
						{Loader({ src: selected, height: 'auto', width: '400px' })}
					</a>
				}
				trigger="click"
				title={
					<table style={{ width: '100%' }}>
						<tbody>
							<tr>
								<td>
									<b>Size</b>
								</td>
								<td>{selected.size != '' ? prettyBytes(selected.size) : 0}</td>
							</tr>
						</tbody>
					</table>
				}
				visible={visible}
				onVisibleChange={() => {
					setSelected(null);
					setVisible(false);
				}}
			/>
		);
	};

	if (multiple) {
		return (
			<>
				{Preview()}
				{renderMultiple()}
			</>
		);
	} else {
		return (
			<>
				{Preview()}

				<a
					href="#"
					onClick={e => {
						setSelected(value);
						setVisible(true);
						e.preventDefault();
					}}>
					{Loader({ src: value, height: '30px', width: 'auto' })}
				</a>
			</>
		);
	}
};

export default memo(Image);
