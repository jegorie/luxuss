import React, { useState } from "react";
import "./Navigation.styles.scss";

import { ReactComponent as LogoIcon } from "../../../common/assets/images/logo.svg";
import { ReactComponent as LeftArrowIcon } from "./assets/arrow-left.svg";
import { ReactComponent as MenuIcon } from "./assets/menu.svg";
import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
  const [burgerOpen, setBurgerOpen] = useState(false);
  const classBurger = burgerOpen ? "" : "nav_hide";
  const links = [
    {
      name: "Типы треугольника",
      to: "/triangle",
    },
    {
      name: "Пароль",
      to: "/password",
    },
    {
      name: "Числовой код",
      to: "/code",
    },
    {
      name: "Проверка числа",
      to: "/numbers",
    },
    {
      name: "Проверка букв",
      to: "/letters",
    },
    {
      name: 'Строка вида "N/M"',
      to: "/stroka",
    },
    {
      name: "Площадь прямоугольника",
      to: "/trianglearea",
    },
    {
      name: "Регистрационный знак",
      to: "/regznak",
    },
  ];

  return (
    <nav className="nav">
      <div className="nav__top">
        <NavLink className="nav__logo" to="/">
          <LogoIcon />
        </NavLink>
        <button
          onClick={() => {
            setBurgerOpen((prevState) => !prevState);
          }}
          className="nav__burger"
        >
          <MenuIcon />
        </button>
      </div>
      <Link to="/" className={`nav__return ${classBurger}`}>
        <LeftArrowIcon />
        <span>На главную</span>
      </Link>
      <div className={`nav__main ${classBurger}`}>
        {links.map(({ name, to }, idx) => (
          <NavLink
            to={to}
            className={({ isActive }) =>
              "nav__main-item" + (isActive ? " nav__main-item_active" : "")
            }
            key={idx}
          >
            {name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
