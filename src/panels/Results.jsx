import React, { Component } from 'react';

export default class Keyboard extends Component {
	static defaultProps = {
		result: "",
		operation: ""
	};

	render () {
		let classNames = ["output"];
		let { className } = this.props;
		classNames.push(className);
		return (
			<div className="result">
				<div className="operation">{ this.props.operation }
				</div>
				<div className={classNames.join(" ")}>{ this.props.result }
				</div>
			</div>
		);
	}
}