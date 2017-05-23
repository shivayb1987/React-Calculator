import React, { Component } from 'react';

export default class Functions extends Component {

	static defaultProps = {
		updateActionArr: () => {}
	};

	componentWillReceiveProps(nextProps) {
		let { reset } = nextProps;
		if (reset) {
			this.resetFunctionClasses();
		}
	}

	componentDidMount() {
		let onClick = this.onFunctinClick.bind(this);
		document.addEventListener('keydown', (ev) => {
			let key;
			let isShift;
			if (window.event) {
				key = window.event.keyCode;
				isShift = !!window.event.shiftKey; // typecast to boolean
			} else {
				key = ev.which;
				isShift = !!ev.shiftKey;
			}
			if (isShift) {
				switch (key) {
					case 16: // ignore shift key
						break;
					case 187: // +
						onClick(ev, ev.key);
						break;
					case 56:  // *
						onClick(ev, "X");
						break;
				  default:
					break;
				}
			} else {
				switch (key) {
					case 187: // =
					case 13: // Enter
						onClick(ev, "=");
						break;
					case 191: // /
					case 189: // -
						onClick(ev, ev.key);
						break;
					case 8: // DEL
						onClick(ev, "DEL");

				}
			}
		});	
	}

	resetFunctionClasses() {
		let elements = document.querySelectorAll(".function");
		elements.forEach(element => {
			element.setAttribute("class", "function");
		});
	}
	
	onFunctinClick (e, key) {
		e.stopPropagation();
		let symbol = typeof key != "object" ? key: e.target.innerText;
		let { updateActionArr } = this.props;
		updateActionArr(symbol);
		this.resetFunctionClasses();
		//override for the current function
		e.target.setAttribute("class", "function clicked");
		if (symbol === "=") {
			e.persist && e.persist();
			setTimeout(() => {
				e.target.setAttribute("class", "function");
			}, 1000);
		}
	}
	
	render () {
		let { resultShown } = this.props;
		return (
			<div className="functions">
				{ resultShown ? 
					"" : 
					<div className="function" onClick={ this.onFunctinClick.bind(this) }>
						DEL
					</div> 
				}
				<div className="function" onClick={ this.onFunctinClick.bind(this) }>
					/
				</div>
				<div className="function" onClick={ this.onFunctinClick.bind(this) }>
					X
				</div>
				<div className="function" onClick={ this.onFunctinClick.bind(this) }>
					-
				</div>
				<div className="function" onClick={ this.onFunctinClick.bind(this) }>
					+
				</div>
				<div className="function" onClick={ this.onFunctinClick.bind(this) }>
					=
				</div>
			</div>
		);
	}
}