import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { createUseStyles } from "react-jss";
import axios from "../axios";
import Navbar from "../components/Navbar";
import Section from "../components/Section";
import Images from "../components/Images";
import Videos from "../components/Videos";
import Review from "../components/Review";
import Cast from "../components/Cast";
import {
	getDetailsURL,
	getImageBaseURL,
	getSimilarURL,
	getRecommendedURL,
} from "../requests";

const styles = createUseStyles({
	root: {
		minHeight: "100vh",
	},
	fadeLeft: {
		position: "absolute",
		background: "-webkit-linear-gradient(right,rgba(0,0,0,0) 80%,#111 100%)",
	},
	row: {},
	"@media (max-width: 1000px)": {
		row: {
			flexDirection: "column-reverse",
		},
	},
	placeHolder: {
		height: "500px",
	},
	"@media (min-width: 1024px)": {
		fadeLeft: {
			height: "455px",
		},
	},
	"@media (min-width: 1366px)": {
		fadeLeft: {
			height: "500px",
		},
	},
	"@media (min-width: 1920px)": {
		fadeLeft: {
			height: "650px",
		},
	},
	"@media (min-width: 2560px)": {
		fadeLeft: {
			height: "840px",
		},
	},
	"@media (min-width: 3440px)": {
		fadeLeft: {
			height: "1200px",
		},
	},
});

function MovieDetails() {
	const classes = styles();
	const location = useLocation();
	const { movie_id } = useParams();
	const [movieDetails, setMovieDetails] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		window.scrollTo(0, 0);
		const fetchMovie = async () => {
			setLoading(true);
			let fetchURL = getDetailsURL("movie", movie_id);
			console.log(fetchURL);
			let request = await axios.get(fetchURL);
			setMovieDetails(request.data);
			setLoading(false);
		};
		fetchMovie();
	}, [movie_id]);

	console.log(movieDetails);

	return (
		<div className={classes.root}>
			<Navbar mediaType="movie" />
			<div className="container-fluid">
				<div className={`${classes.row} row`}>
					<div className="col-lg-5 pt-5 ps-4">
						<h1>
							{movieDetails?.name ||
								movieDetails?.title ||
								movieDetails?.original_name ||
								movieDetails?.original_title}
						</h1>
						<p>{movieDetails?.overview}</p>
						{movieDetails?.genres && (
							<p>
								Genre :{" "}
								{movieDetails?.genres.map((genre, index) => {
									return (
										<span className="badge bg-warning text-dark ms-3">
											{genre.name}
										</span>
									);
								})}
							</p>
						)}
						{movieDetails?.runtime && (
							<p>Runtime : {movieDetails?.runtime} mins</p>
						)}
						{movieDetails?.release_date && (
							<p>Release Date : {movieDetails?.release_date}</p>
						)}
					</div>
					{loading ? (
						<div className="col-7 placeholder-glow">
							<div
								className={`placeholder col-12 bg-dark ${classes.placeHolder}`}
							></div>
						</div>
					) : (
						movieDetails?.backdrop_path && (
							<div className={`col-lg-7`}>
								<div className={`${classes.fadeLeft} col-6`}></div>
								<img
									width="100%"
									src={getImageBaseURL(movieDetails?.backdrop_path)}
									alt={movieDetails?.name}
								/>
							</div>
						)
					)}
				</div>
			</div>
			<Images mediaType="movie" id={movie_id} />
			<Videos mediaType="movie" id={movie_id} />
			<Review mediaType="movie" id={movie_id} />
			<Cast id={movie_id} mediaType="movie" />
			<Section
				title="Similar Movies"
				fetchURL={getSimilarURL("movie", movie_id)}
				mediaType="movie"
				showTotal
			/>
			<Section
				title="Recommended Movies"
				fetchURL={getRecommendedURL("movie", movie_id)}
				mediaType="movie"
				showTotal
			/>
		</div>
	);
}

export default MovieDetails;
