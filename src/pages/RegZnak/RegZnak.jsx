import React, { useState } from "react";import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./RegZnak.scss";

import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";

function gen_password() {
	
}

const validationSchema = yup
	.object({
		textAreaRegZnak: yup
			.string()
			.typeError("Введите пароль ")
			.required("Обязательное поле")
			.matches(
				/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/, "Пароль не падходит"
			),
	})
	.required();

const fields = [
	{
		label: "Поле пароля",
		props: {
			fluid: true,
		},
		name: "textAreaRegZnak",
	},
];

const RegZnak = () => {
	const [answer, setAnswer] = useState(null);
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		trigger,
		formState: { errors },
	} = useForm({
		mode: "onBlur",
		resolver: yupResolver(validationSchema),
		defaultValues: {
			textAreaRegZnak: "",
		},
	});
	const fieldValues = watch();
	const onSubmit = () => {};

	return (
		<div className="znak">
			<h1>Пароль </h1>
			<p>
				Необходимо сформировать строку,
				<br />
				которая будет использоваться в качестве "Пароля"
			</p>
			<div className="znak__content">
				<form className="znak__form" onSubmit={handleSubmit(onSubmit)}>
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
					<Button
						fluid
						onClick={() => {
							setValue("textAreaRegZnak", gen_password());
							trigger();
						}}
						disableForm={true}
					>
						Проверить
					</Button>
				</form>
						
			</div>
		</div>
	);
};

export default RegZnak;
