import React from 'react';
import "./Button.styles.scss";

const Button = ({theme='primary', type='filled', size="medium", fluid=false, children, onClick}) => {

	const classfluid = fluid ? "button_fluid" : ""

	return (
		<button onClick={onClick} className={`button button_${theme}_${type} button_${size} ${classfluid}`}>
			{children}
		</button>
	)
}

export default Button