import React from "react";
import { createUseStyles } from "react-jss";
import { getImageBaseURL } from "../requests";

const styles = createUseStyles({
	img: {
		objectFit: "contain",
		borderRadius: "5px",
	},
	noImg: {
		height: "240px",
		width: "430px",
		backgroundColor: "#202020",
		display: " flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: "5px",
	},
	content: {},
	imgContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	"@media (max-width: 1000px)": {
		content: {
			marginTop: "10px",
		},
	},
	"@media (min-width: 100px)": {
		img: {
			height: "220px",
			marginBottom: "10px",
		},
		imgContainer: {
			justifyContent: "start",
		},
		noImg: {
			height: "220px",
			width: "390px",
		},
	},
	"@media (min-width: 1200px)": {
		img: {
			height: "240px",
		},
		noImg: {
			height: "240px",
			width: "430px",
		},
	},
	"@media (min-width: 1400px)": {
		img: {
			height: "260px",
		},
		noImg: {
			height: "260px",
			width: "460px",
		},
	},
	"@media (min-width: 1600px)": {
		img: {
			height: "320px",
		},
		noImg: {
			height: "320px",
			width: "570px",
		},
	},
	"@media (min-width: 1800px)": {
		img: {
			height: "400px",
		},
		noImg: {
			height: "400px",
			width: "710px",
		},
	},
});

function EpisodeCard(props) {
	const classes = styles();
	return (
		<div class="row my-5 ">
			<div className={`col-lg-5 ${classes.imgContainer}`}>
				{props.episode.still_path ? (
					<img
						className={classes.img}
						src={getImageBaseURL(props.episode.still_path)}
						alt={props.episode.name}
					/>
				) : (
					<div className={`${classes.noImg}`}>{props.episode.name}</div>
				)}
			</div>
			<div
				className={`col-lg-7 px-3 d-flex-col justify-content-start align-items-center ${classes.content}`}
			>
				<h4>
					{props.episode.episode_number}. {props.episode.name}
				</h4>
				<p>{props.episode.overview}</p>
				<p>Air Date : {props.episode.air_date}</p>
			</div>
		</div>
	);
}

export default EpisodeCard;
