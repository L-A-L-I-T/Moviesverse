import React from "react";
import { createUseStyles } from "react-jss";

const style = createUseStyles({
	footer: {
		minHeight: "140px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		background: "#181818",
	},
});

function Footer() {
	const classes = style();
	return (
		<footer className={classes.footer}>
			<h5 class="mb-3">
				Made by <span className="text-warning">Lalit Rajput</span>
			</h5>
			<div>
				<a
					href="https://github.com/L-A-L-I-T"
					target="_blank"
					rel="noreferrer"
					class="me-4"
					style={{ fontSize: "2rem", color: "white" }}
				>
					<i class="bi bi-github" aria-label="GitHub"></i>
				</a>
				<a
					href="https://www.linkedin.com/in/lalit-rajput-9a1a37215/"
					target="_blank"
					rel="noreferrer"
					style={{ fontSize: "2rem", color: "white" }}
				>
					<i class="bi bi-linkedin" aria-label="LinkedIn"></i>
				</a>
			</div>
		</footer>
	);
}

export default Footer;
