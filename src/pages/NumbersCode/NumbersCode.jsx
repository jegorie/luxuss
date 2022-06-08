import React, { useState } from "react";import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./NumbersCode.scss";

import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";



function numbers_code(textAreaCode){
    const arr = textAreaCode;
    let array;
    if(arr.lenght === 9){
        array =arr.slice(0,8);
        if(array/10){
           return array.replaceAt(-1,0);
           
        }
        else if(array/3){
           return array.replaceAt(-1,1);
        }
        else
        {
           return array.replaceAt(-1,9);
        }
    }
}



const validationSchema = yup
	.object({
		textAreaCode: yup
			.number()
            
			.typeError("Введите целое число без букв")
			.required("Обязательное поле")
			,
			
	})
	.required();

const fields = [
	{
		label: "Поле для ввода кода",
		props: {
			fluid: true,
		},
		name: "textAreaCode",
	}
	
];

const NumbersCode = () => {
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
			textAreaCode: "",
		},
	});
	const fieldValues = watch();
	const onSubmit = ({ textAreaCode }) =>
		setAnswer(
			numbers_code(textAreaCode)
			
		);

	return (
		<div className="code">
			<h1>Числовой код </h1>
			<p>
            Проверка введенного числового кода.
				<br />
				

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
					<Button fluid>Проверить</Button>
				</form>
				<div className="code__answer">
					<h2>Ответ:</h2>
					{answer}

				</div>
			</div>
		</div>
	);
};

export default NumbersCode;
