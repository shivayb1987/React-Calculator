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

	updateActionArr(value) {
		let { OPERATIONS } = this.props;
		let {actionArr, history, operation} = this.state;

		let operatorPresent = actionArr.find(action => OPERATIONS.includes(action));
		let tempArr = actionArr.slice();
		if (value !== "-" && OPERATIONS.includes(value) && !actionArr.length) {
			return;
		}
		if (OPERATIONS.includes(value)) {
			if (value !== "-" || !!actionArr.length) {
				let values = actionArr.filter(value => !OPERATIONS.includes(value));
				if (!values.length) {
					this.setState({
						reset: false,
						actionArr: [],
						operation: "",
						result: ""
					});
					return;
				}
			}
		}
		if (this._inProgress) {
			let prevValue = tempArr[tempArr.length - 1];
			let concatenated;
			if (tempArr.length < 3 && value === "=") {
				return;
			}
			if (OPERATIONS.includes(prevValue) && OPERATIONS.includes(value)) {
				tempArr.pop();
				if (value === "=") {
					concatenated = "";
				} else {
					concatenated = `${tempArr.join(' ')} ${value}`;
				}
			} else {
				if (operation === "") {
					concatenated = actionArr.join('');
				} else {
					concatenated = operation;
				}
				concatenated = OPERATIONS.includes(value) ? `${concatenated} ${value} `: `${concatenated}${value}`;
				if (value === "=") {
					concatenated = "";
				}
				if (tempArr.length === 1 && prevValue === "-" && !OPERATIONS.includes(value)) {
					concatenated = `-${value}`;
				}
			}
			
			this.setState({
				reset: false,
				operation: concatenated,
				result: ""
			});
		} else {
			tempArr = [];
			this._inProgress = true;
			if (value !== "-" && OPERATIONS.includes(value)) {
				this.setState({
					reset: false,
					operation: "",
					actionArr: []
				});
				return;
			}
			this.setState({
				reset: false,
				actionArr: [value],
				operation: value,
				result: ""
			});
			return;
		}
		if (actionArr.length < 2 && value === "=") {
			return;
		}
		let prevValue = tempArr[tempArr.length - 1];
		if (!OPERATIONS.includes(value)) {
			let prevValue = tempArr[tempArr.length - 1];
			if (!!prevValue && !OPERATIONS.includes(prevValue)) {
				tempArr.pop();
				tempArr.push(prevValue + value); 
			} else {
				if (tempArr.length === 1) {
					if (prevValue === "-" && !OPERATIONS.includes(value)) {
						tempArr.pop();
						tempArr.push(prevValue + value);
					} else if (prevValue === "-" && OPERATIONS.includes(value)) {
						tempArr.pop();
						tempArr.push(value);
					}
				} else {
					tempArr.push(value);
				}
			}
		} else {
			// if (prevValue === "-" && value === "-") {
			// 	tempArr.pop();
			// 	tempArr.push(prevValue + value);
			// } else if (value === "-" && !!prevValue && OPERATIONS.includes(prevValue)) {
			// 	tempArr.pop();
			// 	tempArr.push(prevValue + value);
			// } else {
				tempArr.push(value);
			// }
		}
		this.setState({
			reset: false,
			result: "",
			actionArr: tempArr
		});
		let result = "";
		if (tempArr.length > 2) {
			result = this.performOperations(value, tempArr.slice(0));
		}
		return result;
	}

	performOperations(operation, tempArr, recursive = false) {
		let result = "";
		let operands = [];
		let length = 0;
		let partialResultPresent = false;
		let partialResult = "";
		switch (operation) {
			case "/": 
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
						operands = tempArr.filter(item => item !== operation);
						result = this.divide(...operands, recursive);
					}
				}
				this.updateState(result, false, partialResultPresent);
				break;
			case "X": 
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
						operands = tempArr.filter(item => item !== operation);
						result = this.multiply(...operands, recursive);
					}
				}
				this.updateState(result, false, partialResultPresent);
				break;
			case "-": 
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
						operands = tempArr.filter(item => item !== operation);
						result = this.subtract(...operands, recursive);
					}
				}
				this.updateState(result, false, partialResultPresent);
				break;
			case "+": 
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
						operands = tempArr.filter(item => item !== operation);
						result = this.add(...operands, recursive);
					}
				}
				this.updateState(result, false, partialResultPresent);
				break;
			case "=":
				tempArr.splice(-1);
				do {
					let lastOp = [];
					let index = tempArr.indexOf("/");
					
					if (!~index) {
						index = tempArr.indexOf("X");
					}

					if (!~index) {
						index = tempArr.indexOf("-");
					}

					if (!!~index && tempArr.length > 3) {
						lastOp = tempArr.splice(index-1, 3);
					} else {
						lastOp = tempArr.splice(-3);
					}
					operation = lastOp[1];
					
					result = this.performOperations(operation, lastOp, true);
					if (tempArr.length > 1) {
						if (!!~index) {
							tempArr.splice(index-1, 0, result);
						} else {
							tempArr.push(result);
						}
					}
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
		let { history, operation } = this.state;
		let tempHistArr = history.slice();
		result = result instanceof Array ? result: [result];
		if (partialResultPresent) {
			this.setState({
				reset: false, 
				result: result[0],
				history: tempHistArr
			});
			return;
		}
		result = result instanceof Array ? result: [result];
		if (saveResult) {
			this._inProgress = false;
			setTimeout(() => {
				let { actionArr } = this.state;
				let concatenated = `${actionArr.join(" ")} ${result}`;
				tempHistArr.unshift(concatenated);
				this.setState({
					reset: false,
					actionArr: [],
					result: result[0],
					history: tempHistArr
				});
			}, 100 );
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
		return (a / b).toFixed(3);
	}

	multiply(a, b) {
		return a * b;
	}

	subtract(a, b) {
		return a - b;
	}

	add(a, b) {
		return parseFloat(a) + parseFloat(b);
	}

	//clear the result and stored values
	clear() {
		this.setState({
			result: "",
			operation: "",
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