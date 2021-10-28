import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";

import { Link } from "react-router-dom";
import axios from "../axios";
import {
	getImageBaseURL,
	getSeasonCreditsURL,
	getMovieCreditsURL,
} from "../requests";

const styles = createUseStyles({
	posterImg: {
		width: "170px",
		borderRadius: "5px",
	},
	rowPosters: {
		transition: "450ms",
		"&:hover": {
			transform: "scale(1.1)",
		},
	},
	rowImages: {
		display: "flex",
		flexDirection: "row",
		alignItems: "flexStart",
		padding: "20px",
		overflowY: "hidden",
		overflowX: "scroll",
		"&::-webkit-scrollbar": {
			display: "none",
		},
	},
	loadingImg: {
		width: "170px",
		height: "257px",
		borderRadius: "5px",
	},
});

function Cast(props) {
	const classes = styles();
	const [credits, setCredits] = useState();

	const fetchCredits = async () => {
		const fetchURL = props.season_id
			? getSeasonCreditsURL(props.id, props.season_id)
			: getMovieCreditsURL(props.id);
		const request = await axios.get(fetchURL);
		console.log(request);
		setCredits(request.data.cast);
	};

	useEffect(() => {
		fetchCredits();
	}, [props.season_id, props.id]);
	return (
		<div className="ms-4">
			<h4>Cast</h4>
			<div className={`${classes.rowImages}`}>
				{credits?.length > 0 ? (
					credits.map((credit, index) => {
						return (
							<Link
								style={{ textDecoration: "none", color: "white" }}
								to={{ pathname: `/person/${credit.id}` }}
							>
								<div
									className={`d-flex flex-column justify-content-start align-items-center me-4 ${classes.rowPosters}`}
									style={{ textAlign: "center" }}
								>
									{credit.profile_path ? (
										<img
											className={classes.posterImg}
											src={getImageBaseURL(credit?.profile_path)}
											alt={credit?.name}
										/>
									) : (
										<div
											class={`placeholder-glow bg-dark ${classes.loadingImg}`}
											aria-hidden="true"
										></div>
									)}
									<h5 className="mt-3">{credit?.original_name}</h5>
									<p className="mt-2">
										{credit.character ||
											(credit.roles && credit.roles[0].character)}
									</p>
								</div>
							</Link>
						);
					})
				) : (
					<div>No Cast</div>
				)}
			</div>
		</div>
	);
}

export default Cast;
