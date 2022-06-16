import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";

import "./Numbers.styles.scss";
import Answers from "../../components/Answers/Answers";
import getErrorKeysFromObjectYup from "../../utils/getErrorsKeysFromObjectYup";

function getTriangleType(TextAreaNumbers) {}

const validationSchema = yup
  .object({
    TextAreaNumbers: yup
      .number()
      .required("Обязательное поле")
      .typeError("Введите число без букв")
      .integer("Введите целое число")
      .test("stroka", "Число не может быть 0", (value) => {
        return /^[1-9]\d+$/.test(
          value
        );
      })
      
      .min(-5636345365, "Слишком маленькое число")
      .max(768574745959859, "Слишком большое число"),
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
  const [answer, setAnswer] = useState(null);
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
  const onSubmit = ({ TextAreaNumbers }) =>
    setAnswer(getTriangleType(TextAreaNumbers));

  return (
    <div className="numbers">
      <h1>Только цифры </h1>
      <p>
        Необходимо проверить, что в текстовом поле
        <br />
        могут быть только цифры
      </p>
      <div className="numbers__content">
        <form className="numbers__form" onSubmit={handleSubmit(onSubmit)}>
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
        triggersList={[...getErrorKeysFromObjectYup(errors), ]}
      />
    </div>
  );
};

export default Numbers;
