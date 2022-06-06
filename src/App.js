import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";

import withNav from "./HOC/withNav/withNav";
import Main from "./pages/Main/Main";
import Triangle from "./pages/Triangle/Triangle";

export default function App() {
	const TrigangeWithMenu = withNav(Triangle);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/triangle" element={<TrigangeWithMenu />} />
			</Routes>
		</Router>
	);
}
