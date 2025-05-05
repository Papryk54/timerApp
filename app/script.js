import React, { useState } from "react";
import { render } from "react-dom";

const App = () => {
	const workTime = 2 * 6;
	const restTime = 4;
	const [status, setStatus] = useState("off");
	const [time, setTime] = useState(workTime);
	const [timer, setTimer] = useState(null);
	const audioElement = new Audio("./sounds/bell.wav");

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes < 10 ? "0" : ""}${minutes}:${
			seconds < 10 ? "0" : ""
		}${seconds}`;
	};

	const startTimer = () => {
		setStatus("work");

		const interval = setInterval(() => {
			setTime((prevTime) => {
				if (prevTime <= 1) {
					audioElement.play();
					setStatus((prevStatus) => {
						const nextStatus = prevStatus === "work" ? "rest" : "work";
						setTime(nextStatus === "work" ? workTime : restTime);
						return nextStatus;
					});
					return prevTime;
				}
				return prevTime - 1;
			});
		}, 1000);

		setTimer(interval);
	};

	const stopTimer = () => {
		clearInterval(timer);
		setStatus("off");
		setTime(20 * 60);
	};

	const closeApp = () => {
		window.close();
	};

	return (
		<div>
			<h1>Protect your eyes</h1>

			{status === "off" && (
				<div>
					<p>
						According to optometrists, you should follow the 20/20/20 rule: rest
						your eyes every 20 minutes by looking at something 20 feet away for
						20 seconds.
					</p>
					<p>This app will help you remember to do that.</p>
				</div>
			)}

			{status === "work" && <img src="./images/work.png" alt="Work" />}
			{status === "rest" && <img src="./images/rest.png" alt="Rest" />}
			{status !== "off" && <div className="timer">{formatTime(time)}</div>}

			{status === "off" && (
				<button className="btn" onClick={() => startTimer()}>
					Start
				</button>
			)}
			{status !== "off" && (
				<button className="btn" onClick={() => stopTimer()}>
					Stop
				</button>
			)}
			<button className="btn btn-close" onClick={closeApp}>
				X
			</button>
		</div>
	);
};

render(<App />, document.querySelector("#app"));
