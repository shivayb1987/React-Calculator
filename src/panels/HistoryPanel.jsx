import React, { Component } from 'react';

export default class HistoryPanel extends Component {
	static defaultProps = {
		last5Calulations: []
	};
	render () {
		let { last5Calulations } = this.props;
		let last5ElementsArr = last5Calulations.slice(0, 5).map((result, index) => (
			<div key={ "result" + index } className="last-calc">
				<span>{ result }</span>
			</div>
		));
		return (
			<div className="history">
				{ !!last5ElementsArr.length && (<div className="heading"><span>Last 5 Calculations</span></div>) }
				{last5ElementsArr}
			</div>
		);
	}
}