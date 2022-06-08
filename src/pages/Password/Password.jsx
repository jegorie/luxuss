import React, { useState } from "react";import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Password.scss";

import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";



function gen_password(){
    let len;
    let lenMin= 8;
    let lenMax = 15;
    len = Math.floor(Math.random()*(lenMax-lenMin+1))+lenMin;
    var password = "";
    var symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!№;%:?*()_+=";
    for (var i = 0; i < len; i++){
        password += symbols.charAt(Math.floor(Math.random() * symbols.length));     
    }
    return password;
}



const validationSchema = yup
	.object({
		textAreaPassword: yup
			.number()
            
			.typeError("Введите целое число без букв")
			.required("Обязательное поле")
			,
			
	})
	.required();

const fields = [
	{
		label: "Поле пароля",
		props: {
			fluid: true,
		},
		name: "textAreaPassword",
	}
	
];

const Numbers = () => {
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
			textAreaPassword: "",
		},
	});
	const fieldValues = watch();
	const onSubmit = ({ password }) =>
		setAnswer(
			gen_password(password)
			
		);

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
					<Button fluid>Проверить</Button>
				</form>
				<div className="password__answer">
					<h2>Ответ:</h2>
					{answer}

				</div>
			</div>
		</div>
	);
};

export default Numbers;
