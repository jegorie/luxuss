import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";

import "./TriangleArea.scss";
import Answers from "../../components/Answers/Answers";
import getErrorKeysFromObjectYup from "../../utils/getErrorsKeysFromObjectYup";


function getTriangleArea(sideA, sideB, sideC) {
  let S;
  let p;
  p = (sideA + sideB + sideC) / 2;
  S = Math.sqrt(p * (p - sideA) * (p - sideB) * (p - sideC));
  return S.toFixed(2) + "(см.кв.)";
}

const validationSchema = yup
  .object({
    sideA: yup
      .string()
      .required("Обязательное поле")
      // .matches(/^-?[0-9]+$/, "Введите цифры")
      .test("onlynum", "Введите цифры", (value) => {
        return /^-?[0-9]+$/.test(value);
      })
      // .matches(/^(?!-)[0-9]+$/, "Только положительные")
      .test("positive", "Только положительные", (value) => {
        return /^(?!-)[0-9]+$/.test(value);
      })
      // .matches(/^[1-9]+$/, "Больше нуля")
      .test("zero", "Больше нуля", (value) => {
        return /^[1-9]\d*$/.test(value);
      })
      .typeError("Введите цифры")
      // .positive("Только положительные цифры")
      .test(
        "max sum of two fields",
        "Одна сторона не должна быть больше суммы двух других",
        (value, ctx) => {
          if (value && ctx.parent.sideC && ctx.parent.sideB) {
            return +value < +ctx.parent.sideC + +ctx.parent.sideB;
          }
          return true;
        }
      ),
    sideB: yup
      .string()
      .required("Обязательное поле")
      // .matches(/^-?[0-9]+$/, "Введите цифры")
      .test("onlynum", "Введите цифры", (value) => {
        return /^-?[0-9]+$/.test(value);
      })
      // .matches(/^(?!-)[0-9]+$/, "Только положительные")
      .test("positive", "Только положительные", (value) => {
        return /^(?!-)[0-9]+$/.test(value);
      })
      // .matches(/^[1-9]+$/, "Больше нуля")
      .test("zero", "Больше нуля", (value) => {
        return /^[1-9]\d*$/.test(value);
      })
      .typeError("Введите цифры")
      // .positive("Только положительные цифры")
      .test(
        "max sum of two fields",
        "Одна сторона не должна быть больше суммы двух других",
        (value, ctx) => {
          if (value && ctx.parent.sideC && ctx.parent.sideA) {
            return +value < +ctx.parent.sideC + +ctx.parent.sideA;
          }
          return true;
        }
      ),
    sideC: yup
      .string()
      .required("Обязательное поле")
      // .matches(/^-?[0-9]+$/, "Введите цифры")
      .test("onlynum", "Введите цифры", (value) => {
        return /^-?[0-9]+$/.test(value);
      })
      // .matches(/^(?!-)[0-9]+$/, "Только положительные")
      .test("positive", "Только положительные", (value) => {
        return /^(?!-)[0-9]+$/.test(value);
      })
      // .matches(/^[1-9]+$/, "Больше нуля")
      .test("zero", "Больше нуля", (value) => {
        return /^[1-9]\d*$/.test(value);
      })
      .typeError("Введите цифры")
      // .positive("Только положительные цифры")
      .test(
        "max sum of two fields",
        "Одна сторона не должна быть больше суммы двух других",
        (value, ctx) => {
          if (value && ctx.parent.sideA && ctx.parent.sideB) {
            return +value < +ctx.parent.sideA + +ctx.parent.sideB;
          }
          return true;
        }
      ),
  })
  .required();

const fields = [
  {
    label: "Сторона А",
    props: {
      fluid: true,
    },
    name: "sideA",
  },
  {
    label: "Сторона В",
    props: {
      fluid: true,
    },
    name: "sideB",
  },
  {
    label: "Сторона С",
    props: {
      fluid: true,
    },
    name: "sideC",
  },
];

const TriangleArea = () => {
  const [answer, setAnswer] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      sideA: "",
      sideB: "",
      sideC: "",
    },
  });
  const fieldValues = watch();
  const onSubmit = ({ sideA, sideB, sideC }) =>
    setAnswer(getTriangleArea(sideA, sideB, sideC));
  useEffect(() => {
    const { sideA, sideB, sideC } = fieldValues;
    if (sideA && sideB && sideC && !isValid) {
      trigger();
      console.log(fieldValues);
    }
  }, [fieldValues.sideA, fieldValues.sideB, fieldValues.sideC]);

  return (
    <div className="triangleArea">
      <h1>Площадь треугольника</h1>
      <p>
        Определение площади треугольника по трем его сторонам. Каждая из сторон
        <br />
        задается в отдельном текстовом поле.
      </p>
      <div className="triangleArea__content">
        <form className="triangleArea__form" onSubmit={handleSubmit(onSubmit)}>
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
        <div className="triangleArea__answer">
          <h2>Площадь треугольника:</h2>
          <p>{answer}</p>
        </div>
      </div>
      <Answers
        casesList={[
          {
            text: "Обязательное поле A",
            trigger: "required-sideA",
          },
          {
            text: "Обязательное поле B",
            trigger: "required-sideB",
          },
          {
            text: "Одна сторона не должна быть больше суммы двух других",
            trigger: "max sum of two fields-sideC",
          },
          {
            text: "Введён 0 ",
            trigger: "zero-sideB",
          },
          {
            text: "Отрицательное число ",
            trigger: "positive-sideA",
          },
          {
            text: "Буквы",
            trigger: "onlynum-sideC",
          },
        ]}
        triggersList={[...getErrorKeysFromObjectYup(errors), answer]}
      />
    </div>
  );
};

export default TriangleArea;
