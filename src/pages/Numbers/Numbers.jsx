import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";

import "./Numbers.styles.scss";
import Answers from "../../components/Answers/Answers";
import getErrorKeysFromObjectYup from "../../utils/getErrorsKeysFromObjectYup";

const validationSchema = yup
  .object({
    TextAreaNumbers: yup
      .string()
      .required("Обязательное поле")
      .test("onlynum", "Введите число без букв", (value) => {
        return /^-?[0-9]+$/.test(value);
      })
      .test("biggest", "Слишком большое число", (value) => {
        return +value <= 768574745959859;
      })
      .test("lowest", "Слишком маленькое число", (value) => {
        return +value >= -5636345365;
      }),
  })
  .required();

const fields = [
  {
    label: "Поле для ввода цифр",
    props: {
      fluid: true,
    },
    name: "TextAreaNumbers",
  },
];

const Numbers = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      sideA: "",
    },
  });
  const fieldValues = watch();

  return (
    <div className="numbers">
      <h1>Только цифры </h1>
      <p>
        Необходимо проверить, что в текстовом поле
        <br />
        могут быть только цифры
      </p>
      <div className="numbers__content">
        <form className="numbers__form" onSubmit={handleSubmit()}>
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
            text: "Вы ввели 0",
            trigger: "stroka-TextAreaNumbers",
          },
          {
            text: "Не целое",
            trigger: "integer-TextAreaNumbers",
          },
          {
            text: "Слишком большое",
            trigger: "max-TextAreaNumbers",
          },
          {
            text: "Слишком маленькое",
            trigger: "min-TextAreaNumbers",
          },
        ]}
        triggersList={[...getErrorKeysFromObjectYup(errors)]}
      />
    </div>
  );
};

export default Numbers;
