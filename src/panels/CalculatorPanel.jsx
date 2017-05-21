'use strict';
import React, { Component } from 'react';
import HistoryPanel from './HistoryPanel';
import Results from './Results';
import Keyboard from './Keyboard';
import Functions from './Functions';

export default class CalculatorPanel extends Component {
	constructor() {
		super();
		this._inProgress = true;
	}
	static defaultProps = {
		OPERATIONS: ['/', 'X', '-', '+', '=']
	};

	state = {
		operation: "",
		actionArr: [],
		result: "",
		history: [],
		reset: false
	};

	countOfOperations(arr) {
		let { OPERATIONS } = this.props;
		return arr.reduce((count, value) => {
			if (OPERATIONS.includes(value)) {
				return count + 1;
			}
			return count;
		}, 0);
	}

	//use it recursively in case of "="
	updateActionArr(value, recursive = false) {
		let { OPERATIONS } = this.props;
		let {actionArr, history, operation} = this.state;

		let operatorPresent = actionArr.find(action => OPERATIONS.includes(action));
		let tempArr = actionArr.slice(0);
		if (this._inProgress) {  //it's data, not a function so need to concatenate
			let concatenated;
			if (operation === "") {
				concatenated = actionArr.join('');
			} else {
				concatenated = operation;
			}
			concatenated = OPERATIONS.includes(value) ? `${concatenated} ${value} `: `${concatenated}${value}`;
			if (value === "=") {
				concatenated = "";
			}
			this.setState({
				reset: false,
				operation: concatenated,
				result: ""
			});
			// return;
		} else {
			tempArr = [];
			this._inProgress = true;
			this.setState({
				reset: false,
				operation: value,
				result: ""
			});
		}
		if (!recursive) {  // "=" not pressed, so continue to next operation
			if (!OPERATIONS.includes(value)) {
				let prevValue = tempArr[tempArr.length - 1];
				if (!!prevValue && !OPERATIONS.includes(prevValue)) {
					tempArr.pop();
					tempArr.push(prevValue + value); 
				} else {
					tempArr.push(value);
				} 
			} else {
				tempArr.push(value);
			}
		} else {
			value = tempArr[1];
		}
		this.setState({
			reset: false,
			result: "",
			actionArr: tempArr
		});
		let result = "";
		// if (!recursive && this.countOfOperations(tempArr) < 2 && value !== "=") { // not enough operands to perform any operation
		// 	this.setState({
		// 		reset: false,
		// 		result: "",
		// 		actionArr: tempArr
		// 	});
		// 	return "";
		// } else {  // we now have enough operands to perform an operation
			// if (!nonFunctions.length) {
			// 	this.setState({
			// 		reset: false,
			// 		result: value,
			// 		actionArr: []
			// 	});
			// 	return "";
			// } else {
			// 	switch (value) {
			// 		case "/": 
			// 			//get operands
			// 			operands = tempArr.filter(item => item !== value);
			// 			if (operands.length > 2) {
			// 				let partialResult = this.updateActionArr("=", true);
			// 				result = [partialResult, "/"];
			// 			} else {
			// 				result = this.divide(...operands, recursive);
			// 			}
			// 			this.updateState(result, recursive);
			// 			break;
			// 		case "*":
			// 		case "X": 
			// 			operands = tempArr.filter(item => item !== value);
			// 			let length = tempArr.length;
			// 			if (length > 2) {
			// 				tempArr.slice(-3);
			// 			}
			// 			let partialResultPresent = false;
			// 			if (tempArr[tempArr.length - 1] === value) {
			// 				let partialResult = this.updateActionArr("X", true);
			// 				result = [partialResult];
			// 				partialResultPresent = true;
			// 			} else {
			// 				result = this.multiply(...operands, recursive);
			// 			}
			// 			this.updateState(result, recursive, partialResultPresent);
			// 			break;
			// 		case "-": 
			// 			operands = tempArr.filter(item => item !== value);
			// 			if (operands.length > 2) {
			// 				let partialResult = this.updateActionArr("=", true);
			// 				result = [partialResult, "-"];
			// 			} else {
			// 				result = this.subtract(...operands, recursive);
			// 			}
			// 			this.updateState(result, recursive);
			// 			break;
			// 		case "+": 
			// 			operands = tempArr.filter(item => item !== value);
			// 			if (operands.length > 2) {
			// 				let partialResult = this.updateActionArr("=", true);
			// 				result = [partialResult, "+"];
			// 			} else {
			// 				result = this.add(...operands, recursive);
			// 			}
						
			// 			this.updateState(result, recursive);
			// 			break;
			// 		case "=": //show result and save it for History
			// 			result = this.updateActionArr("=", true);
			// 			break;
			// 		default:
			// 			this.setState({
			// 				reset: false, 
			// 				result: value,
			// 				actionArr: tempArr
			// 			});
			// 			result = "";
			// 	}
			// }
				if (tempArr.length > 2) {
					result = this.performOperations(value, tempArr.slice(0));
				}
				this.setState({
					actionArr: tempArr
				});
				return result;
			// }
		// }
	}

	performOperations(operation, tempArr, recursive = false) {
		let result = "";
		let operands = [];
		let length = 0;
		let partialResultPresent = false;
		let partialResult = "";
		switch (operation) {
			case "/": 
				//get operands
				operands = tempArr.filter(item => item !== operation);
				length = tempArr.length;
				let partialResultPresent = false;
				if (length > 2) {
					if (tempArr[tempArr.length - 1] === operation) {
						tempArr.splice(-1);
						tempArr.push("=");
						partialResult = this.performOperations("=", tempArr, true);
						result = [partialResult];
						partialResultPresent = true;
					} else {
						result = this.divide(...operands, recursive);
					}
				}
				this.updateState(result, false, partialResultPresent);
				break;
			case "X": 
				operands = tempArr.filter(item => item !== operation);
				length = tempArr.length;
				partialResultPresent = false;
				if (length > 2) {
					if (tempArr[tempArr.length - 1] === operation) {
						tempArr.splice(-1);
						tempArr.push("=");
						partialResult = this.performOperations("=", tempArr, true);
						result = [partialResult];
						partialResultPresent = true;
					} else {
						result = this.multiply(...operands, recursive);
					}
				}
				this.updateState(result, false, partialResultPresent);
				break;
			case "-": 
				operands = tempArr.filter(item => item !== operation);
				length = tempArr.length;
				partialResultPresent = false;
				if (length > 2) {
					if (tempArr[tempArr.length - 1] === operation) {
						tempArr.splice(-1);
						tempArr.push("=");
						partialResult = this.performOperations("=", tempArr, true);
						result = [partialResult];
						partialResultPresent = true;
					} else {
						result = this.subtract(...operands, recursive);
					}
				}
				this.updateState(result, false, partialResultPresent);
				break;
			case "+": 
				operands = tempArr.filter(item => item !== operation);
				length = tempArr.length;
				partialResultPresent = false;
				if (length > 2) {
					if (tempArr[tempArr.length - 1] === operation) {
						tempArr.splice(-1);
						tempArr.push("=");
						partialResult = this.performOperations("=", tempArr, true);
						result = [partialResult];
						partialResultPresent = true;
					} else {
						result = this.add(...operands, recursive);
					}
				}
				this.updateState(result, false, partialResultPresent);
				break;
			case "=": //show result and save it for History
				tempArr.splice(-1);
				do {
					console.log(tempArr);
					let lastOp = tempArr.splice(-3);
					operation = lastOp[1];
					result = this.performOperations(operation, lastOp, true);
					// tempArr = tempArr.slice(-2);
					tempArr.push(result);
				} while (tempArr.length >= 2)
				this.updateState(result, !recursive);
				break;
			default:
				this.setState({
					reset: false, 
					actionArr: tempArr
				});
				result = "";
		}
		return result;
	}

	updateState(result, saveResult, partialResultPresent = false) {
		let { history, actionArr, operation } = this.state;
		let tempHistArr = history.slice();
		result = result instanceof Array ? result: [result];
		if (partialResultPresent) {
			this.setState({
				reset: false, 
				result: result[0],
				history: tempHistArr
			});
			return;
		} else if (saveResult) {
			let concatenated = `${operation} = ${result}`;
			tempHistArr.unshift(concatenated);
		}
		result = result instanceof Array ? result: [result];
		if (saveResult) {
			this.setState({
				reset: false,
				actionArr: [],
				result: result[0],
				history: tempHistArr
			});
			this._inProgress = false;
		} else {
			this.setState({
				reset: false,
				result: result[0]
			});
			this._inProgress = true;
		}
		
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
			operation: "",
			actionArr: [],
			history: [],
			reset: true
		});
	}

	render() {
		let { result, actionArr, history, reset, operation } = this.state;
		let className = this._inProgress ? "" :  "final";
		return (
			<div className="main-view">
				<div className="history-view">
					<HistoryPanel last5Calulations={ history }
					/>
				</div>
				<div className="calc-view">
					<Results actionArr= { actionArr } operation={operation} result= { result } className={className}/>
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