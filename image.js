import React, { Component, Fragment } from 'react';
import GenerateThumbnail from '@volenday/generate-thumbnail';
import ImageLoader from 'react-imageloader';
import prettyBytes from 'pretty-bytes';
import { Popover } from 'antd';

import 'antd/es/popover/style/css';
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
			<Fragment>
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
			</Fragment>
		);
	}

	Loader(props) {
		let value = GenerateThumbnail(props.src.url);
		return (
			<ImageLoader
				src={value.url}
				wrapper={React.createFactory('div')}
				imgProps={{ width: props.width, height: props.height, maxwidth: '100%' }}
				preloader={() => <i class="fa fa-spinner fa-pulse fa-fw" />}>
				<img
					src="https://s3-ap-southeast-1.amazonaws.com/images.aha.volenday.com/production/defaults/image.jpg"
					style={{ width: '30px', height: '30px', maxWidth: '100%' }}
				/>
			</ImageLoader>
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
				<Fragment>
					{this.Preview()}
					{this.renderMultiple()}
				</Fragment>
			);
		} else {
			return (
				<Fragment>
					{this.Preview()}

					<a
						href="#"
						onClick={e => {
							this.setState({ selected: value, visible: true });
							e.preventDefault();
						}}>
						{this.Loader({ src: value, height: '30px', width: 'auto' })}
					</a>
				</Fragment>
			);
		}
	}
}
