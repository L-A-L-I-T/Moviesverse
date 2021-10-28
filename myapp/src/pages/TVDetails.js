import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { createUseStyles } from "react-jss";
import axios from "../axios";
import Navbar from "../components/Navbar";
import Images from "../components/Images";
import Videos from "../components/Videos";
import Review from "../components/Review";
import Section from "../components/Section";
import EpisodeCard from "../components/EpisodeCard";
import Cast from "../components/Cast";
import {
	getDetailsURL,
	getImageBaseURL,
	getSeasonURL,
	getSimilarURL,
	getRecommendedURL,
} from "../requests";

const styles = createUseStyles({
	root: {
		minHeight: "100vh",
	},
	fadeLeft: {},
	"@media (max-width: 1000px)": {
		row: {
			flexDirection: "columnReverse",
		},
	},
	"@media (min-width: 1000px)": {
		fadeLeft: {
			height: "455px",
			position: "absolute",
			background: "-webkit-linear-gradient(right,rgba(0,0,0,0) 80%,#111 100%)",
		},
	},
	loadingImg: {
		width: "100%",
		height: "455px",
	},
});

function truncate(str, n) {
	return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

function TVDetails() {
	const classes = styles();
	const location = useLocation();
	const { tv_id } = useParams();
	const [tvDetails, setTvDetails] = useState();
	const [season, setSeason] = useState(1);
	const [seasonDetails, setSeasonDetails] = useState();
	const [loading, setLoading] = useState(true);

	const fetchMovie = async () => {
		let fetchURL = getDetailsURL("tv", tv_id);
		console.log(fetchURL);
		let request = await axios.get(fetchURL);
		console.log(request);
		setTvDetails(request.data);
	};
	const fetchSeasonDetails = async () => {
		let fetchURL = getSeasonURL(tv_id, season);
		let request = await axios.get(fetchURL);
		console.log(request);
		setSeasonDetails(request.data);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		fetchMovie();
		fetchSeasonDetails();
		setLoading(false);
	}, [tv_id]);

	useEffect(() => {
		window.scrollTo(0, 0);
		fetchSeasonDetails();
	}, [season, tv_id]);

	return (
		<div className={classes.root}>
			<Navbar mediaType="tv" />
			<div className="container-fluid">
				<div className={`${classes.row} row`}>
					<div className="col-lg-5 pt-5 ps-4">
						<h1>
							{tvDetails?.name ||
								tvDetails?.title ||
								tvDetails?.original_name ||
								tvDetails?.original_title}
						</h1>
						<p>
							<b class>Total Seasons :</b>
							<span class="badge bg-warning text-dark ms-2 me-4">
								{tvDetails?.number_of_seasons}
							</span>
							<b>Total Episodes : </b>
							<span class="badge bg-warning text-dark ms-2 ">
								{tvDetails?.number_of_episodes}
							</span>
						</p>

						<div class="dropdown">
							<button
								class="btn btn-outline-warning dropdown-toggle"
								type="button"
								id="dropdownMenu2"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								Season {season}
							</button>
							<ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
								{new Array(tvDetails?.number_of_seasons)
									.fill(null)
									.map((item, index) => {
										return (
											<li>
												<button
													class="dropdown-item"
													type="button"
													onClick={() => {
														setSeason(index + 1);
													}}
												>
													Season {index + 1}
												</button>
											</li>
										);
									})}
							</ul>
						</div>
						<p class="mt-4">
							{truncate(seasonDetails?.overview || tvDetails?.overview, 400)}
						</p>

						{/* <button type="button" class="btn btn-outline-warning">
							Add Review
						</button>
						<button type="button" class="btn ms-4">
							<i
								class="bi bi-heart-fill"
								style={{ fontSize: "1.5rem", color: "#e81752" }}
							></i>
						</button> */}
					</div>
					<div className="col-lg-7">
						{seasonDetails?.episodes?.length > 0 ? (
							<>
								<div className={`${classes.fadeLeft} col-6`}></div>
								<img
									width="100%"
									height="450px"
									src={getImageBaseURL(
										seasonDetails?.episodes[0]?.still_path ||
											seasonDetails?.poster_path
									)}
									alt={tvDetails?.name}
								/>
							</>
						) : (
							<div
								class={`placeholder-glow bg-dark ${classes.loadingImg}`}
								aria-hidden="true"
							></div>
						)}
					</div>
				</div>
				<div class="container-fluid">
					<h4 class="my-3">Episodes({seasonDetails?.episodes.length})</h4>
					{seasonDetails?.episodes.map((episode, index) => {
						return <EpisodeCard episode={episode} id={episode.id} />;
					})}
				</div>
			</div>
			<Cast id={tv_id} season_id={season} />
			<Images mediaType="tv" id={tv_id} season_id={season} />
			<Images mediaType="tv" id={tv_id} />
			<Videos mediaType="tv" id={tv_id} season_id={season} />
			<Review mediaType="tv" id={tv_id} />
			<Section
				title="Similar Shows"
				fetchURL={getSimilarURL("tv", tv_id)}
				mediaType="tv"
			/>
			<Section
				title="Recommended Shows"
				fetchURL={getRecommendedURL("tv", tv_id)}
				mediaType="tv"
			/>
		</div>
	);
}

export default TVDetails;
