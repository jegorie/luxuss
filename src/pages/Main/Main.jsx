import React from 'react'
import "./Main.scss"
import Button from '../../components/Button/Button';
import { useNavigate } from "react-router-dom"

import { ReactComponent as HeaderIcon } from '../../assets/svg/header.svg';
import computerImage from "./images/main-dt.png";

const Main = () => {
	let navigate = useNavigate();

	const goToFirstTask = () => {
		navigate('/triangle')
	}


	return (
		<div className="main">
			<header className="header">
				<div className="limiter header__limiter">
					<HeaderIcon />
				</div>
			</header>
			<main className="main__content limiter">
				<h1>
					Погрузитесь в мир <br/>
					тестирования <br/>
					<span>сейчас</span>
				</h1>
				<Button onClick={goToFirstTask} theme="secondary" fluid>Открыть задачи</Button>
				<img className="main__image" src={computerImage} alt="computer" />
			</main>
	</div>
	)
}

export default Main