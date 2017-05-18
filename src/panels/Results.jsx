import React, { Component } from 'react';

export default class Keyboard extends Component {
	static defaultProps = {
		result: ""
	};

	render () {
		return (
			<div className="result">{ this.props.result }
			</div>
		);
	}
}