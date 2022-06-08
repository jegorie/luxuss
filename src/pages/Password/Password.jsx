import React, { useState } from "react";import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Password.scss";

import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";

function gen_password() {
	let len;
	let lenMin = 8;
	let lenMax = 15;
	len = Math.floor(Math.random() * (lenMax - lenMin + 1)) + lenMin;
	let password = "";
	let symbols =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#?!@$%^&*-";
	for (let i = 0; i < len; i++) {
		password += symbols.charAt(Math.floor(Math.random() * symbols.length));
	}
	return password;
}

const validationSchema = yup
	.object({
		textAreaPassword: yup
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
		name: "textAreaPassword",
	},
];

const Numbers = () => {
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
			textAreaPassword: "",
		},
	});
	const fieldValues = watch();
	const onSubmit = () => {};

	return (
		<div className="password">
			<h1>Пароль </h1>
			<p>
				Необходимо сформировать строку,
				<br />
				которая будет использоваться в качестве "Пароля"
			</p>
			<div className="password__content">
				<form className="password__form" onSubmit={handleSubmit(onSubmit)}>
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
							setValue("textAreaPassword", gen_password());
							trigger();
						}}
						disableForm={true}
					>
						Сгенерировать пароль 
					</Button>
				</form>
						
			</div>
		</div>
	);
};

export default Numbers;
