import React, { Component } from 'react';
import CalculatorPanel from '../panels/CalculatorPanel';
import HistoryPanel from '../panels/HistoryPanel';

export default class App extends Component {
	render() {
		return (
			<div className="my-calculator">
				<CalculatorPanel/>
				<HistoryPanel/>
			</div>
		);
	}
}