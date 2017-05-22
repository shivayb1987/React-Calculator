import React, { Component } from 'react';

export default class Keyboard extends Component {

	static defaultProps = {
		updateActionArr: () => {}
	};
	
	componentDidMount() {
		let onKeyPress = this.onNumeralClick.bind(this);
		let { onClear, onReset } = this.props;
		
		document.addEventListener('keydown', (event) => {
			let { keyCode } = event;
			if (event.shiftKey) {
				return;
			}
			if (keyCode >= 48 && keyCode <= 57) {
				onKeyPress(event, event.key);
			} else {
				if (keyCode === 67) { // C 
					onClear();
				} else if (keyCode === 82) { // R
					onReset();
				} else if (keyCode === 190) { // .
					onKeyPress(event, event.key);
				}
			} 
		});	
	}

	onNumeralClick(e, key) {
		e.stopPropagation();
		let value = typeof key != "object" ? key: e.target.innerText;
		let { updateActionArr } = this.props;
		updateActionArr(value);
	}
	
	render () {
		let { onClear, onReset } = this.props;
		return (
			<div className="keyboard">
				<div className="controls">
					<span className="clear" onClick={ onClear }>C</span>
					<span className="reset" onClick={ onReset }>RESET</span>
				</div>
				<div className="digits">
					<div className="row">
						{ [7, 8, 9].map((numeral) => (
							<span key={ "numeral-" + numeral } className="numeral" onClick={ this.onNumeralClick.bind(this) }>{ numeral }</span>
						)) }
					</div>
					<div className="row">
						{ [4, 5, 6].map((numeral) => (
								<span key={ "numeral-" + numeral } className="numeral" onClick={ this.onNumeralClick.bind(this) }>{ numeral }</span>
						)) }
					</div>
					<div className="row">
						{ [1, 2, 3].map((numeral) => (
								<span key={ "numeral-" + numeral } className="numeral" onClick={ this.onNumeralClick.bind(this) }>{ numeral }</span>
						)) }
					</div>
				</div>
				<div className="row last">
					<span className="numeral-0" onClick={ this.onNumeralClick.bind(this) }>0</span>
					<span className="numeral-dot" onClick={ this.onNumeralClick.bind(this) }>.</span>
				</div>
			</div>
		);
	}
}