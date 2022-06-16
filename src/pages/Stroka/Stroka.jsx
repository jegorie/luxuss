import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";

import "./Stroka.scss";
import Answers from "../../components/Answers/Answers";
import getErrorKeysFromObjectYup from "../../utils/getErrorsKeysFromObjectYup";

function getNum(textAreaStroka) {
  const arr = textAreaStroka.split("/");

  if (arr.length === 2) {
    if (arr[0] > arr[1]) {
      return `${arr[1]}/${arr[1]}`;
    }
    return `${arr[0]}/${arr[1]}`;
  }
  return "Введите строку вида N/M";
}

const validationSchema = yup.object({
  textAreaStroka: yup
    .string()
    .required("Обязательное поле")
    .test("devider", "Строка должна содержать разделитель", (value) => {
      return /\//.test(value);
    })
    .test("tooMany", "Только один разделитель", (value) => {
      return value.split("/").length === 2;
    })
    .test("n-int", "N должна содержать только цифры", (value) => {
      return /^[0-9]+$/.test(value.split("/")[0]);
    })
    .test("m-int", "M должна содержать только цифры", (value) => {
      return /^[0-9]+$/.test(value.split("/")[1]);
    })
    .test("stroka", "Введите строку вида N/M", (value) => {
      return /^([1-9](\d)?)+\/([1-9](\d)?)+$/.test(value);
    }),
});

const fields = [
  {
    label: "Поле для ввода",
    props: {
      fluid: true,
    },
    name: "textAreaStroka",
  },
];

const Stroka = () => {
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
      textAreaStroka: "",
    },
  });
  const fieldValues = watch();
  const onSubmit = ({ textAreaStroka }) => setAnswer(getNum(textAreaStroka));

  return (
    <div className="stroka">
      <h1>Строка N/M </h1>
      <p>
        Пусть имеется строка вида "N/M",
        <br />
        где N - первое число, M - второе число.
      </p>
      <div className="stroka__content">
        <form className="stroka__form" onSubmit={handleSubmit(onSubmit)}>
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
        <div className="stroka__answer">
          <h2>Ответ:</h2>
          {answer}
        </div>
      </div>
      <Answers
        casesList={[
          {
            text: "Обязательное поле ",
            trigger: "required-textAreaStroka",
          },
          {
            text: "Строка не той формы(Обрабатывает ошибки на 0,буквы,больше 1 /)",
            trigger: "stroka-textAreaStroka",
          },
        ]}
        triggersList={[...getErrorKeysFromObjectYup(errors), answer]}
      />
    </div>
  );
};

export default Stroka;
