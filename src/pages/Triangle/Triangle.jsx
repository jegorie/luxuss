import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";
import "./Triangle.scss";
import Answers from "../../components/Answers/Answers";
import getErrorKeysFromObjectYup from "../../utils/getErrorsKeysFromObjectYup";

function getTriangleType(sideA, sideB, sideC) {
  return sideC ** 2 == sideA ** 2 + sideB ** 2 ||
    sideA ** 2 == sideB ** 2 + sideC ** 2 ||
    sideB ** 2 == sideA ** 2 + sideC ** 2
    ? "Прямоугольный треугольник"
    : sideC ** 2 > sideA ** 2 + sideB ** 2 ||
      sideA ** 2 > sideB ** 2 + sideC ** 2 ||
      sideB ** 2 > sideA ** 2 + sideC ** 2
    ? "Тупоугольный треугольник"
    : "Остроугольный треугольник";
}

function getTriangleView(sideA, sideB, sideC) {
  return (sideA === sideB && sideA === sideC) || sideB === sideC
    ? " (Равносторонний треугольник)"
    : sideA === sideB || sideA === sideC || sideB === sideC
    ? " (Равнобедренный треугольник)"
    : " (Разносторонний треугольник)";
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

const Triangle = () => {
  const [answer, setAnswer] = useState(null);
  const [quest, setQuest] = useState(null);
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
  const onSubmit = ({ sideA, sideB, sideC }) => {
    setAnswer(getTriangleType(sideA, sideB, sideC));
    setQuest(getTriangleView(sideA, sideB, sideC));
  };

  useEffect(() => {
    const { sideA, sideB, sideC } = fieldValues;
    if (sideA && sideB && sideC && !isValid) {
      trigger();
      console.log(fieldValues);
    }
  }, [fieldValues.sideA, fieldValues.sideB, fieldValues.sideC]);

  return (
    <div className="triangle">
      <h1>Типы треугольников</h1>
      <p>
        Определение типа треугольника по трем его сторонам. Каждая из сторон
        <br />
        задается в отдельном текстовом поле.
      </p>
      <div className="triangle__content">
        <form className="triangle__form" onSubmit={handleSubmit(onSubmit)}>
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
        <div className="triangle__answer">
          <h2>Ответ:</h2>
          {answer}

          {quest}
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
            text: "Обязательное поле C",
            trigger: "required-sideC",
          },
          {
            text: "Прямоугольный треугольник",
            trigger: "Прямоугольный треугольник",
          },
          {
            text: "Тупоугольный треугольник",
            trigger: "Тупоугольный треугольник",
          },
          {
            text: "Остроугольный треугольник",
            trigger: "Остроугольный треугольник",
          },
          {
            text: "Равносторонний треугольник",
            trigger: " (Равносторонний треугольник)",
          },
          {
            text: "Равнобедренный треугольник",
            trigger: " (Равнобедренный треугольник)",
          },
          {
            text: "Равнобедренный треугольник",
            trigger: " (Разносторонний треугольник)",
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
        triggersList={[...getErrorKeysFromObjectYup(errors), answer, quest]}
      />
    </div>
  );
};

export default Triangle;
