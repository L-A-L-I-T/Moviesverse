import React, { useEffect } from "react";
import { createUseStyles } from "react-jss";
import Routes from "./routes";

const styles = createUseStyles({
	app: {
		backgroundColor: "#111",
		color: "white",
		fontFamily: "'Poppins', sans-serif",
	},
});

function App() {
	const classes = styles();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<div className={classes.app}>
			<Routes />
		</div>
	);
}

export default App;
