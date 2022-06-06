import React, { useRef } from "react";
import "./TextArea.scss";

const TextArea = React.forwardRef(
	({ value, onChange, error, label, helper, fluid, ...restInput }, ref) => {
		const hasError = error ? "textarea_error" : "";
		const notEmpty = value ? "textarea_not-empty" : "";
		const isFuild = fluid ? "textarea_fluid" : "";

		return (
			<div className={`textarea ${hasError} ${notEmpty} ${isFuild}`}>
				<input
					type="text"
					className="textarea__input"
					value={value}
					onChange={onChange}
					ref={ref}
					{...restInput}
				/>
				<div className="textarea__label">{label}</div>
				{(error || helper) && (
					<div className="textarea__helper">{error || helper}</div>
				)}
			</div>
		);
	}
);
export default TextArea;
