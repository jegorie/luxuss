import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./NumbersCode.scss";

import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";

function numbers_code(textAreaCode) {
	const arr = textAreaCode.toString();

	if (arr.length === 10) {
		let array = arr.slice(0, 9);

		let sum = array.split("").reduce((acc, value) => {
			acc += value;
		});
		if (sum % 10 === 0) {
			console.log(arr[9] === "0");
			return arr[9] === "0";
		} else if (sum % 3 === 0) {
			console.log(arr[9] === "0");
			return arr[9] === "1";
		} else {
			console.log(arr[9] === "0");
			return arr[9] === "9";
		}
	}
}

const validationSchema = yup
	.object({
		textAreaCode: yup
			.number()
			.typeError("Введите 10 цифр")
			.required("Обязательное поле")
			.test("check", "Контрольное число не верное", value => {
				if (!value) {
					return true;
				}

				const string = value.toString();

				if (string.length === 10) {
					let array = string.slice(0, 9);

					let sum = array.split("").reduce((acc, value) => {
						return (acc += +value);
					}, 0);
					console.log(sum);
					if (sum % 10 === 0) {
						return string[9] === "0";
					} else if (sum % 3 === 0) {
						return string[9] === "1";
					} else {
						return string[9] === "9";
					}
				}
			}),
	})
	.required();

const fields = [
	{
		label: "Поле для ввода кода",
		props: {
			fluid: true,
		},
		name: "textAreaCode",
	},
];

const NumbersCode = () => {
	const [answer, setAnswer] = useState(null);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
	} = useForm({
		mode: "onChange",
		resolver: yupResolver(validationSchema),
		defaultValues: {
			textAreaCode: "",
		},
	});
	const fieldValues = watch();
	const onSubmit = ({ textAreaCode }) => {
		setAnswer(numbers_code(textAreaCode));
	};

	return (
		<div className="code">
			<h1>Числовой код </h1>
			<p>
				Проверка введенного числового кода.
				<br />
                Последняя цифра кода – контрольное (проверочное число)
                <br />
                Усли сумма первых 9 цифр делится на 10, то в конце (на месте
            проверочного числа )должен стоять 0
            <br />
            Усли сумма первых 9 цифр делится на 3, то в конце (на месте
            проверочного числа ) должна стоять единица 1;
            <br />
            Во всех остальных случаях в конце кода (на месте проверочного числа)
                стоит цифра 9.


			</p>
			<div className="code__content">
				<form className="code__form" onSubmit={handleSubmit(onSubmit)}>
					{fields.map((item, idx) => (
						<TextArea
							label={item.label}
							{...item.props}
							{...register(item.name)}
							value={fieldValues[item.name]}
							error={errors[item.name]?.message}
							key={idx}
						/>
					))}
					
				</form>
				<div className="code__answer">
					<h2>Ответ:</h2>
					{isValid && "Все отлично"}
				</div>
			</div>
		</div>
	);
};

export default NumbersCode;
