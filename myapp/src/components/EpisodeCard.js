import React from "react";
import { createUseStyles } from "react-jss";
import { getImageBaseURL } from "../requests";

const styles = createUseStyles({
	img: {
		objectFit: "contain",
		height: "240px",
		borderRadius: "5px",
	},
	loadingImg: {
		height: "240px",
		width: "430px",
	},
});

function EpisodeCard(props) {
	const classes = styles();
	return (
		<div class="row my-5 ms-2">
			<div class="col-lg-4 d-flex justify-content-center align-items-center">
				{props.episode.still_path ? (
					<img
						className={classes.img}
						src={getImageBaseURL(props.episode.still_path)}
						alt={props.episode.nam}
					/>
				) : (
					<div className={`placeholder bg-dark ${classes.loadingImg}`}></div>
				)}
			</div>
			<div className="col-lg-8 pe-5">
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
