import React, { useState } from "react";import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Numbers.styles.scss";

import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";






const validationSchema = yup
	.object({
		textAreaLetters: yup
			.string()
			.typeError("Введите целое число без букв")
			.required("Обязательное поле"),
			
	})
	.required();

const fields = [
	{
		label: "Поле для ввода цифр",
		props: {
			fluid: true,
		},
		name: "textArealetters",
	}
	
];

const Letters = () => {
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
		},
	});
	const fieldValues = watch();
	const onSubmit = ({ textArealetters }) =>
		setAnswer(
			getTriangleType(textArealetters)
			
		);
	return (
		<div className="letters">
			<h1>Только цифры </h1>
			<p>
            Необходимо проверить, что в текстовом поле
				<br />
				могут быть только цифры
			</p>
			<div className="letters__content">
				<form className="letters__form" onSubmit={handleSubmit(onSubmit)}>
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
			</div>
		</div>
	);
};

export default Letters;
