import React from "react";
import "./Navigation.styles.scss";

import { ReactComponent as LogoIcon } from "../../../common/assets/images/logo.svg";
import { ReactComponent as LeftArrowIcon } from "./assets/arrow-left.svg";
import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
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
			to: "/",
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
			to: "/",
		},
		{
			name: "Площадь прямоугольника",
			to: "/trianglearea",
		},
		{
			name: "Регистрационный знак",
			to: "/",
		},
	];

	return (
		<nav className="nav">
			<NavLink className="nav__logo" to="/">
				<LogoIcon />
			</NavLink>
			<Link to="/" className="nav__return">
				<LeftArrowIcon />
				<span>На главную</span>
			</Link>
			<div className="nav__main">
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
