import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";

import { Link } from "react-router-dom";
import axios from "../axios";
import { fetchTrending, getImageBaseURL } from "../requests";

const styles = createUseStyles({
	banner: {
		color: "white",
		height: "450px",
		marginBottom: "20px",
	},
	bannerContent: {
		marginLeft: "30px",
		height: "200px",
		paddingTop: "100px",
	},
	bannerTitle: {
		fontSize: "3rem",
		fontWeight: "800",
		paddingBottom: "0.3rem",
	},
	bannerDescription: {
		lineHeight: "1.3",
		paddingTop: "1rem",
		fontSize: "1.2rem",
		maxWidth: "500px",
		height: "120px",
	},
	bannerFadeBottom: {
		height: "18rem",
		backgroundImage:
			"linear-gradient(180deg , transparent, rgba(37,37,37,0.61),#111)",
	},
	"@media (max-width: 600px)": {
		bannerDescription: {
			maxWidth: "450px",
			paddingRight: "1rem",
		},
	},
});

function Banner(props) {
	const classes = styles();
	const [movie, setMovie] = useState();
	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchTrending(props.mediaType));
			const max = request.data.results.length;
			const index = Math.floor(Math.random() * max);
			console.log(index);
			console.log(max);
			setMovie(request.data.results[index]);
		}
		fetchData();
	}, []);
	console.log(movie);
	const [windowSize, setWindowSize] = useState(null);
	useEffect(() => {
		const handleResize = () => {
			setWindowSize(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);
	function truncate(str, n) {
		return str?.length > n ? str.substr(0, n - 1) + "..." : str;
	}

	return (
		<header
			className={classes.banner}
			style={{
				backgroundSize: "cover",
				backgroundImage: `url(${getImageBaseURL(movie?.backdrop_path)})`,
				backgroundPosition: "center top",
			}}
		>
			<div className={classes.bannerContent}>
				<h1 className={`${classes.bannerTitle} text-white`}>
					{movie?.title ||
						movie?.name ||
						movie?.original_name ||
						movie?.original_title}
				</h1>
				{windowSize > 500 ? (
					<h1 className={classes.bannerDescription}>
						{truncate(movie?.overview, 150)}
					</h1>
				) : (
					<h1 className={classes.bannerDescription}>
						{truncate(movie?.overview, 100)}
					</h1>
				)}
				<Link to={`/${props.mediaType}/details/${movie?.id}`}>
					<button class="btn btn-outline-light">
						Details <i class="bi bi-arrow-right"></i>
					</button>
				</Link>
			</div>
			<div className={classes.bannerFadeBottom}></div>
		</header>
	);
}

export default Banner;
