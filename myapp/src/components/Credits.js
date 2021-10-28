import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import axios from "../axios";
import { getCreditsURL, getImageBaseURL } from "../requests";

const styles = createUseStyles({
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
	posterImg: {
		height: "250px",
		marginRight: "20px",
		borderRadius: "5px",
		transition: "transform 470ms",
		"&:hover": {
			transform: "scale(1.1)",
		},
	},
	defaultImg: {
		height: "250px",
		width: "180px",
		borderRadius: "5px",
	},
});

function Credits(props) {
	const classes = styles();
	const [movieCredits, setMovieCredits] = useState();
	const [tvCredits, setTVCredits] = useState();
	const fetchMovieCredits = async () => {
		const fetchURL = getCreditsURL("movie", props.id);
		const request = await axios.get(fetchURL);
		console.log(request);
		setMovieCredits(request.data.cast);
	};
	const fetchTVCredits = async () => {
		const fetchURL = getCreditsURL("tv", props.id);
		const request = await axios.get(fetchURL);
		console.log(request);
		setTVCredits(request.data.cast);
	};
	useEffect(() => {
		window.scrollTo(0, 0);
		fetchMovieCredits();
		fetchTVCredits();
	}, [props.id]);
	return (
		<div>
			<h3 class="ms-4">Movies</h3>
			<div className={classes.rowImages}>
				{movieCredits &&
					movieCredits.map((movie, index) => {
						return (
							<Link to={`/movie/details/${movie.id}`}>
								<div>
									{movie.poster_path && (
										<img
											className={classes.posterImg}
											src={getImageBaseURL(movie?.poster_path)}
											alt={movie?.original_title}
										/>
									)}
								</div>
							</Link>
						);
					})}
			</div>
			<h3 class="ms-4">TV Shows</h3>
			<div className={classes.rowImages}>
				{tvCredits &&
					tvCredits.map((tv, index) => {
						return (
							<Link to={`/tv/details/${tv.id}`}>
								<div>
									{tv.poster_path && (
										<img
											className={classes.posterImg}
											src={getImageBaseURL(tv?.poster_path)}
											alt={tv?.original_title}
										/>
									)}
								</div>
							</Link>
						);
					})}
			</div>
		</div>
	);
}

export default Credits;
