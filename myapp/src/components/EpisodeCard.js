import React from "react";
import { createUseStyles } from "react-jss";
import { getImageBaseURL } from "../requests";

const styles = createUseStyles({
	img: {
		objectFit: "cover",
		width: "100%",
		borderRadius: "5px",
		minHeight: "250px",
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
		img: { minHeight: "180px", marginBottom: "10px" },
		imgContainer: {
			justifyContent: "center",
		},
		noImg: {
			height: "180px",
			width: "350px",
		},
	},
	"@media (max-width: 414px)": {
		noImg: {
			height: "200px",
			width: "360px",
		},
	},
	"@media (max-width: 320px)": {
		noImg: {
			height: "150px",
			width: "320px",
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
		<div class="row my-5 justify-content-center">
			<div className={`col-lg-4  col-md-5 ${classes.imgContainer}`}>
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
				className={`col-lg-8 px-3 d-flex-col justify-content-start align-items-center ${classes.content}`}
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
