import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./TriangleArea.scss";

import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";

function getTriangleArea(sideA, sideB, sideC) {
	let S ;
	let p;
	p=(sideA + sideB + sideC)/2;
	S=Math.sqrt(p*(p-sideA)*(p-sideB)*(p-sideC));
	return S.toFixed(2) + "(см.кв.)";
}



const validationSchema = yup
	.object({
		sideA: yup
			.number()
			.typeError("Введите цифры")
			.required("Обязательное поле")
			.positive("Только положительные цифры"),
		sideB: yup
			.number()
			.typeError("Введите цифры")
			.required("Обязательное поле")
			.positive("Только положительные цифры"),
		sideC: yup
			.number()
			.typeError("Введите цифры")
			.required("Обязательное поле")
			.positive("Только положительные цифры"),
	})
	.required();

const fields = [
	{
		label: "Сторона А",
		props: {
			fluid: true,
		},
		name: "sideA",
	},
	{
		label: "Сторона В",
		props: {
			fluid: true,
		},
		name: "sideB",
	},
	{
		label: "Сторона С",
		props: {
			fluid: true,
		},
		name: "sideC",
	},
];

const TriangleArea = () => {
	const [answer, setAnswer] = useState(null);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		mode: "onBlur",
		resolver: yupResolver(validationSchema),
		defaultValues: {
			sideA: "",
			sideB: "",
			sideC: "",
		},
	});
	const fieldValues = watch();
	const onSubmit = ({ sideA, sideB, sideC }) =>
		setAnswer(
			getTriangleArea(sideA, sideB, sideC)
			
		);

	return (
		<div className="triangleArea">
			<h1>Площадь треугольника</h1>
			<p>
				Определение площади треугольника по трем его сторонам. Каждая из сторон
				<br />
				задается в отдельном текстовом поле.
			</p>
			<div className="triangleArea__content">
				<form className="triangleArea__form" onSubmit={handleSubmit(onSubmit)}>
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
					<Button fluid>Проверить</Button>
				</form>
				<div className="triangleArea__answer">
					<h2>Площадь треугольника:</h2>
					<p>
					{answer} 
					</p>
					

					
				</div>
			</div>
		</div>
	);
};

export default TriangleArea;
