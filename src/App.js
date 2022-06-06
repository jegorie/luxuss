import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";

import withNav from "./HOC/withNav/withNav";
import Letters from "./pages/Letters/Letters";
import Main from "./pages/Main/Main";
import Numbers from "./pages/Numbers/Numbers";
import Triangle from "./pages/Triangle/Triangle";
import TriangleArea from "./pages/TriangleArea/TriangleArea";

export default function App() {
	const TrigangeWithMenu = withNav(Triangle);
	const TriangleAreaWithMenu = withNav(TriangleArea);
	const NumbersWithMenu = withNav(Numbers);
	const LettersWithMenu = withNav(Letters);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/triangle" element={<TrigangeWithMenu />} />
				<Route path="/trianglearea" element={<TriangleAreaWithMenu />} />
				<Route path="/numbers" element={<NumbersWithMenu/>} />
				<Route path="/letters" element={<LettersWithMenu/>} />
			</Routes>
		</Router>
	);
}
