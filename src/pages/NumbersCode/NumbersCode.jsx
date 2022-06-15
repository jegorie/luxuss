import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


import TextArea from "../../components/TextArea/TextArea";

import "./NumbersCode.scss";
import Answers from "../../components/Answers/Answers";
import getErrorKeysFromObjectYup from "../../utils/getErrorsKeysFromObjectYup";

const validationSchema = yup
  .object({
    textAreaCode: yup
      .number()
      .required("Обязательное поле")
      .typeError("Введите 10 цифр")
     
      .test("check", "Контрольное число не верное", (value) => {
        if (!value) {
          return true;
        }

        const string = value.toString();
        
        if (string.length === 10) {
         
          let array = string.slice(0, 9);

          let sum = array.split("").reduce((acc, value) => {
            return (acc += +value);
          }, 0);

          if (sum % 10 === 0) {
            return string[9] === "0";
          } else if (sum % 3 === 0) {
            return string[9] === "1";
          } else {
            return string[9] === "9";
          }
        }
      }),
  })
  .required();

const fields = [
  {
    label: "Поле для ввода кода",
    props: {
      fluid: true,
    },
    name: "textAreaCode",
  },
];

const NumbersCode = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      textAreaCode: "",
    },
  });
  const fieldValues = watch();
  const onSubmit = ({ textAreaCode }) => {};

  return (
    <div className="code">
      <h1>Числовой код </h1>
      <p>
        Проверка введенного числового кода.
        <br />
        Последняя цифра кода – контрольное (проверочное число)
        <br />
        Усли сумма первых 9 цифр делится на 10, то в конце (на месте
        проверочного числа )должен стоять 0
        <br />
        Усли сумма первых 9 цифр делится на 3, то в конце (на месте проверочного
        числа ) должна стоять единица 1;
        <br />
        Во всех остальных случаях в конце кода (на месте проверочного числа)
        стоит цифра 9.
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
          {isValid && "Все отлично"}
        </div>
      </div>
      
      <Answers
        casesList={[
          {
            text: "Обязательное поле ",
            trigger: "required-textAreaCode",
          },
          {
            text: "Не цифры",
            trigger: "typeError-textAreaCode",
          },
          
          
          
        ]}
        triggersList={[...getErrorKeysFromObjectYup(errors), ]}
      />
    </div>
  );
};

export default NumbersCode;
