import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";

import "./Password.scss";
import Answers from "../../components/Answers/Answers";
import getErrorKeysFromObjectYup from "../../utils/getErrorsKeysFromObjectYup";

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
      // .matches(
      //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/,
      //   "Пароль не падходит"
      // )
      
      .test("stroka", "Пароль не подходит", (value) => {
        return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(value);
      })
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
        Необходимо сформировать строку,которая будет использоваться в качестве "Пароля"
        <br />
        
        <br />
        количество символов - от 8 до 15
        <br />
        пароль должен содержать цифры  пароль должен содержать не менее одной латинской буквы в нижнем
регистре
<br />
пароль должен содержать не менее одной латинской буквы в верхнем регистре
<br />
пароль должен содержать не менее одного спец.символа

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
      <Answers
        casesList={[
          {
            text: "Обязательное поле ",
            trigger: "required-textAreaPassword",
          },
          {
            text: "Пароль(Обрабатывает ошибки на отсутсвие цифр,спец символов,букв и длинну)",
            trigger: "stroka-textAreaPassword",
          },
          {
            text: "Длинна меньше 8",
            trigger: "lenght-textAreaPassword",
          },
          
        ]}
        triggersList={[...getErrorKeysFromObjectYup(errors), ]}
      />
    </div>
  );
};

export default Numbers;
