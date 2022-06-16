import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";

import "./RegZnak.scss";

import Answers from "../../components/Answers/Answers";
import getErrorKeysFromObjectYup from "../../utils/getErrorsKeysFromObjectYup";

import { regionsList } from "../../regions";

const validationSchema = yup
  .object({
    textAreaRegZnak: yup
      .string()
      .typeError("Введите пароль ")
      .required("Обязательное поле")
      .test("stroka", "Не верный формат", (value) => {
        return /^[АВЕКМНОРСТУХABEKMHOPCTYX]\d{3}[АВЕКМНОРСТУХABEKMHOPCTYX]{2}\d{2,3}$/.test(
          value
        );
      })
      .test("noZeros", "Не верный диапазон", (value) => {
        return value.slice(1, 4) !== "000";
      })
      .test("regions", "Не верный регион", (value) => {
        const region = value.slice(6);
        return regionsList.includes(region);
      }),
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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      textAreaRegZnak: "",
    },
  });
  const fieldValues = watch();
  const onSubmit = ({ textAreaRegZnak }) => {};

  return (
    <div className="znak">
      <h1>Номерной знак автомобиля РФ </h1>
      <p>
        Проверка правильности ввода регистрационного номерного знака
        <br />
        автомобиля Российской Федерации.
        <br />
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
          <Button fluid>Проверить</Button>
        </form>
      </div>
      <Answers
        casesList={[
          {
            text: "Обязательное поле ",
            trigger: "required-textAreaRegZnak",
          },
          {
            text: "Строка не той формы(Обрабатывает ошибки на цифры и другие символы)",
            trigger: "stroka-textAreaRegZnak",
          },
        ]}
        triggersList={[...getErrorKeysFromObjectYup(errors)]}
      />
    </div>
  );
};

export default RegZnak;
