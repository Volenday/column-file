import React, { Component } from 'react';
import GenerateThumbnail from '@volenday/generate-thumbnail';
import prettyBytes from 'pretty-bytes';
import { Popover, Spin } from 'antd';
import Img from 'react-image';

import './styles.css';

export default class Image extends Component {
	state = {
		selected: null,
		visible: false
	};

	renderMultiple() {
		const { value = [] } = this.props;
		const newValue = value.slice(0, 2);

		return (
			<>
				{newValue.map((d, i) => {
					return (
						<a
							href="#"
							key={`preview-${d.fileName}-${i}`}
							onClick={e => {
								this.setState({ selected: d, visible: true });
								e.preventDefault();
							}}
							style={{ marginRight: 3 }}>
							{this.Loader({ src: d, height: '30px', width: 'auto' })}
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
												this.setState({ selected: d, visible: true });
												e.preventDefault();
											}}>
											{this.Loader({ src: d, height: '30px', width: 'auto' })}
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
	}

	Loader(props) {
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
	}

	Preview = () => {
		const { selected, visible } = this.state;

		if (!selected || !visible) return null;

		return (
			<Popover
				content={
					<a href={selected.url} target="_blank">
						{this.Loader({ src: selected, height: 'auto', width: '400px' })}
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
				onVisibleChange={() => this.setState({ selected: null, visible: false })}
			/>
		);
	};

	render() {
		const { multiple, value = {} } = this.props;

		if (multiple) {
			return (
				<>
					{this.Preview()}
					{this.renderMultiple()}
				</>
			);
		} else {
			return (
				<>
					{this.Preview()}

					<a
						href="#"
						onClick={e => {
							this.setState({ selected: value, visible: true });
							e.preventDefault();
						}}>
						{this.Loader({ src: value, height: '30px', width: 'auto' })}
					</a>
				</>
			);
		}
	}
}
