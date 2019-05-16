import React, { Component, Fragment } from 'react';
import { CornerDialog, Pane, Popover } from 'evergreen-ui';
import GenerateThumbnail from '@volenday/generate-thumbnail';
import ImageLoader from 'react-imageloader';

export default class Image extends Component {
	state = {
		selected: null,
		visible: false
	};

	renderMultiple() {
		const { value, viewMore } = this.props;

		let fileArr = [];
		for (let i = 0; i < value.length; i++) {
			if (i > 1) {
				i = value.length;
				fileArr.push(
					<Popover
						key={i}
						content={
							<Pane width={240} display="flex" padding={16} backgroundColor="#9999">
								{value.map(d => {
									return (
										<a
											key={d}
											href="#"
											onClick={e => {
												this.setState({ selected: d, visible: true });
												e.preventDefault();
											}}
											style={{ marginRight: 3 }}>
											{this.Loader({ src: d, height: '30px', width: 'auto' })}
										</a>
									);
								})}
							</Pane>
						}>
						{({ getRef, toggle }) => {
							return (
								<a onClick={e => toggle()} title="View More Images" ref={getRef}>
									<i class="fa fa-external-link" aria-hidden="true" />
								</a>
							);
						}}
					</Popover>
				);
			} else {
				fileArr.push(
					<a
						href="#"
						onClick={e => {
							this.setState({ selected: value[i], visible: true });
							e.preventDefault();
						}}
						style={{ marginRight: 3 }}>
						{this.Loader({ src: value[i], height: '30px', width: 'auto' })}
					</a>
				);
			}
		}
		return fileArr;
	}

	Loader(props) {
		let value = GenerateThumbnail(props.src);
		return (
			<ImageLoader
				src={value.url}
				wrapper={React.createFactory('div')}
				imgProps={{ width: props.width, height: props.height }}
				preloader={() => <i class="fa fa-spinner fa-pulse fa-fw" />}>
				<img src="/images/default.jpg" style={{ width: '30px', height: '30px' }} />
			</ImageLoader>
		);
	}

	Preview = () => {
		const { selected, visible } = this.state;
		const { column } = this.props;

		if (!selected || !visible) return null;

		const { originalUrl } = GenerateThumbnail(selected);
		return (
			<CornerDialog
				title="File View"
				isShown={visible}
				hasFooter={false}
				onCloseComplete={() => this.setState({ selected: null, visible: false })}>
				<a href={originalUrl} class="btn btn-flat btn-block btn-primary" target="_blank">
					<i class="fa fa-external-link-square" aria-hidden="true" /> Open
				</a>
				{this.Loader({ src: selected, height: 'auto', width: '100%' })}
			</CornerDialog>
		);
	};

	render() {
		const { column, multiple, value } = this.props;

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
