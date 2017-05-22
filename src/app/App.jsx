import React, { Component } from 'react';
import CalculatorPanel from '../panels/CalculatorPanel';
import HistoryPanel from '../panels/HistoryPanel';

export default class App extends Component {
	render() {
		return (
			<div className="my-calculator">
				<div className="title">Basic Calculator Using ReactJS</div>
				<CalculatorPanel/>
				<HistoryPanel/>
			</div>
		);
	}
}