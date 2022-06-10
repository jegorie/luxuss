import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";

import withNav from "./HOC/withNav/withNav";
import Letters from "./pages/Letters/Letters";
import Main from "./pages/Main/Main";
import Numbers from "./pages/Numbers/Numbers";
import Triangle from "./pages/Triangle/Triangle";
import TriangleArea from "./pages/TriangleArea/TriangleArea";
import Password from "./pages/Password/Password";
import Stroka from "./pages/Stroka/Stroka";
import NumbersCode from "./pages/NumbersCode/NumbersCode";
import RegZnak from "./pages/RegZnak/RegZnak";

export default function App() {
	const TrigangeWithMenu = withNav(Triangle);
	const TriangleAreaWithMenu = withNav(TriangleArea);
	const NumbersWithMenu = withNav(Numbers);
	const LettersWithMenu = withNav(Letters);
	const PasswordWithMenu = withNav(Password);
	const StrokaWithMenu = withNav(Stroka);
	const NumbersCodeWithMenu = withNav(NumbersCode);
	const RegZnakCodeWithMenu = withNav(RegZnak);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/triangle" element={<TrigangeWithMenu />} />
				<Route path="/trianglearea" element={<TriangleAreaWithMenu />} />
				<Route path="/numbers" element={<NumbersWithMenu />} />
				<Route path="/letters" element={<LettersWithMenu />} />
				<Route path="/password" element={<PasswordWithMenu />} />
				<Route path="/stroka" element={<StrokaWithMenu />} />
				<Route path="/code" element={<NumbersCodeWithMenu />} />
				<Route path="/regznak" element={<RegZnakCodeWithMenu />} />
			</Routes>
		</Router>
	);
}
