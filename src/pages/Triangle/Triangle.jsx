import React, { useState } from "react";import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Triangle.scss";

import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";

function getTriangleType(sideA, sideB, sideC) {
	return sideC ** 2 == sideA ** 2 + sideB ** 2 ||
		sideA ** 2 == sideB ** 2 + sideC ** 2 ||
		sideB ** 2 == sideA ** 2 + sideC ** 2
		? "Прямоугольный треугольник"
		: sideC ** 2 > sideA ** 2 + sideB ** 2 ||
		  sideA ** 2 > sideB ** 2 + sideC ** 2 ||
		  sideB ** 2 > sideA ** 2 + sideC ** 2
		? "Тупоугольный треугольник"
		: "Остроугольный треугольник";
}

function getTriangleView(sideA, sideB, sideC) {
	return sideA === sideB && sideA === sideC || sideB === sideC
		? " (Равносторонний треугольник)"
		: sideA === sideB || sideA === sideC || sideB === sideC
		? " (Равнобедренный треугольник)"
		: " (Разносторонний треугольник)";
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

const Triangle = () => {
	const [answer, setAnswer] = useState(null);
	const [quest, setQuest] = useState(null);
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
			getTriangleType(sideA, sideB, sideC),
			setQuest(getTriangleView(sideA, sideB, sideC))
		);

	return (
		<div className="triangle">
			<h1>Типы треугольников</h1>
			<p>
				Определение типа треугольника по трем его сторонам. Каждая из сторон
				<br />
				задается в отдельном текстовом поле.
			</p>
			<div className="triangle__content">
				<form className="triangle__form" onSubmit={handleSubmit(onSubmit)}>
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
				<div className="triangle__answer">
					<h2>Ответ:</h2>
					{answer}

					{quest}
				</div>
			</div>
		</div>
	);
};

export default Triangle;
