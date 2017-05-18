import React, { Component } from 'react';
import HistoryPanel from './HistoryPanel';
import Results from './Results';
import Keyboard from './Keyboard';
import Functions from './Functions';

export default class CalculatorPanel extends Component {
	constructor() {
		super();
		this._inProgress = false;
	}
	static defaultProps = {
		OPERATIONS: ['/', 'X', '-', '+', '=']
	};

	state = {
		actionArr: [],
		result: "",
		history: [],
		reset: false
	};

	//use it recursively in case of "="
	updateActionArr(value, recursive = false) {
		let { OPERATIONS } = this.props;
		let {actionArr, history} = this.state;

		let operatorPresent = actionArr.find(action => OPERATIONS.includes(action));
		
		if (!this._inProgress && !operatorPresent && !OPERATIONS.includes(value)) {  //it's data, not a function so need to concatenate
			const concatenated = actionArr.join('') + value
			this.setState({
				reset: false,
				result: actionArr.join('') + value,
				actionArr: [concatenated]
			});
			return;
		}
		let tempArr = actionArr.slice();
		if (!recursive) {  // "=" not pressed, so continue to next operation
			tempArr.push(value);
		} else {
			value = tempArr[1];
		}
		if (tempArr.length <= 2 && value !== "=") { // not enough operands to perform any operation
			this.setState({
				reset: false,
				result: value,
				actionArr: tempArr
			});
			return "";
		} else {  // we now have enough operands to perform an operation
			let operands = [];
			let result = "";
			let nonFunctions = tempArr.filter(item => !OPERATIONS.includes(item));
			if (!nonFunctions.length) {
				this.setState({
					reset: false,
					result: value,
					actionArr: []
				});
				return "";
			} else {
				switch (value) {
					case "/": 
						//get operands
						operands = tempArr.filter(item => item !== value);
						if (operands.length > 2) {
							let partialResult = this.updateActionArr("=", true);
							result = [partialResult, "/"];
						} else {
							result = this.divide(...operands, recursive);
						}
						this.updateState(result, recursive);
						return result;
					case "*":
					case "X": 
						operands = tempArr.filter(item => item !== value);
						if (operands.length > 2) {
							let partialResult = this.updateActionArr("=", true);
							result = [partialResult, "X"];
						} else {
							result = this.multiply(...operands, recursive);
						}
						this.updateState(result, recursive);
						return result;;
					case "-": 
						operands = tempArr.filter(item => item !== value);
						if (operands.length > 2) {
							let partialResult = this.updateActionArr("=", true);
							result = [partialResult, "-"];
						} else {
							result = this.subtract(...operands, recursive);
						}
						this.updateState(result, recursive);
						return result;
					case "+": 
						operands = tempArr.filter(item => item !== value);
						if (operands.length > 2) {
							let partialResult = this.updateActionArr("=", true);
							result = [partialResult, "+"];
						} else {
							result = this.add(...operands, recursive);
						}
						
						this.updateState(result, recursive);
						return result;
					case "=": //show result and save it for History
						this.updateActionArr("=", true);
						return result;;
					default:
						this.setState({
							reset: false, 
							result: value,
							actionArr: tempArr
						});
				}
			}
			
		}
	}

	updateState(result, saveResult) {
		let { history, actionArr } = this.state;
		let tempHistArr = history.slice();
		if (saveResult) {
			tempHistArr.unshift(actionArr.join(' '));
			let concatenated = `${tempHistArr[0]} = ${result}`;
			tempHistArr[0] = concatenated;
			this._inProgress = false;
		} else {
			this._inProgress = true;
		}
		result = result instanceof Array ? result: [result];
		this.setState({
		reset: false, 
			result: result[0],
			actionArr: result,
			history: tempHistArr
		});
	}

	divide(a, b) {
		if (b === 0) {
			// alert('Cannot divide by 0!');
			return;
		}
		return a / b;
	}

	multiply(a, b) {
		return a * b;
	}

	subtract(a, b) {
		return a - b;
	}

	add(a, b) {
		return parseInt(a) + parseInt(b);
	}

	//clear the result and stored values
	clear() {
		this.setState({
			result: "",
			actionArr: [],
			reset: true
		});
	}

	//Isn't it same as clear()
	reset() {
		this.setState({
			result: "",
			actionArr: [],
			history: [],
			reset: true
		});
	}

	render() {
		let { result, actionArr, history, reset } = this.state;
		return (
			<div className="main-view">
				<div className="history-view">
					<HistoryPanel last5Calulations={ history }
					/>
				</div>
				<div className="calc-view">
					<Results actionArr= { actionArr } result= { result }/>
					<div className="flex">
						<Keyboard 
							updateActionArr={ this.updateActionArr.bind(this) }
							onClear={ this.clear.bind(this) }
							onReset={ this.reset.bind(this) }
						/>
						<Functions reset={ reset } updateActionArr={ this.updateActionArr.bind(this) } 
						/>
					</div>
				</div>
			</div>
		);
	}
}