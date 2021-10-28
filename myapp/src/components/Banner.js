import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";

import { Link } from "react-router-dom";
import axios from "../axios";
import { fetchTrending, getImageBaseURL } from "../requests";

const styles = createUseStyles({
	banner: {
		color: "white",
		objectFit: "contain",
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

	function truncate(str, n) {
		return str?.length > n ? str.substr(0, n - 1) + "..." : str;
	}

	return (
		<header
			className={classes.banner}
			style={{
				backgoundSize: "contain",
				backgroundImage: `url(${getImageBaseURL(movie?.backdrop_path)})`,
				backgroundPosition: "center center",
			}}
		>
			<div className={classes.bannerContent}>
				<h1 className={classes.bannerTitle}>
					{movie?.title ||
						movie?.name ||
						movie?.original_name ||
						movie?.original_title}
				</h1>
				<h1 className={classes.bannerDescription}>
					{truncate(movie?.overview, 150)}
				</h1>
				<Link to={`/${props.mediaType}/details/${movie?.id}`}>
					<button class="btn btn-outline-light">Details</button>
				</Link>
			</div>
			<div className={classes.bannerFadeBottom}></div>
		</header>
	);
}

export default Banner;
