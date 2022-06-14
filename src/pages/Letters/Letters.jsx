import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import TextArea from "../../components/TextArea/TextArea";

import "./Letters.scss";
import Answers from "../../components/Answers/Answers";
import getErrorKeysFromObjectYup from "../../utils/getErrorsKeysFromObjectYup";


const validationSchema = yup
  .object({
    textAreaLetters: yup
      .string()
      .typeError("Введите буквы")
      .required("Обязательное поле")
     // .matches(/^([а-яА-ЯёЁa-zA-Z])+$/, "Только буквы Русские или Латинские"),
     
     .test("stroka", "Только буквы Русские или Латинские", (value) => {
        return /^([а-яА-ЯёЁa-zA-Z])+$/.test(value);
      }),
  })
  .required();

const fields = [
  {
    label: "Поле для ввода букв",
    props: {
      fluid: true,
    },
    name: "textAreaLetters",
  },
];

const Letters = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      textAreaLetters: "",
    },
  });
  const fieldValues = watch();
  const onSubmit = ({ textAreaLetters }) => {};

  return (
    <div className="letters">
      <h1>Только буквы </h1>
      <p>
        Необходимо проверить, что в текстовом поле
        <br />
        могут быть только Русские или Латинские
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
      <Answers
        casesList={[
          {
            text: "Обязательное поле ",
            trigger: "required-textAreaLetters",
          },
          {
            text: "Строка не той формы(Обрабатывает ошибки на цифры и другие символы)",
            trigger: "stroka-textAreaLetters",
          },
        ]}
        triggersList={[...getErrorKeysFromObjectYup(errors), ]}
      />
    </div>
  );
};

export default Letters;
