import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Numbers.styles.scss";

import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";

function getTriangleType(TextAreaNumbers) {}

const validationSchema = yup
  .object({
    TextAreaNumbers: yup
      .number()
      .typeError("Введите целое число без букв")
      .required("Обязательное поле")
      .integer("Введите целое число без букв")
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
    mode: "onBlur",
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
        <div className="numbers__answer">
          <h2>Ответ:</h2>
          {answer}
        </div>
      </div>
    </div>
  );
};

export default Numbers;
