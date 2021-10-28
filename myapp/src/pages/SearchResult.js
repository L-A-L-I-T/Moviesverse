import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createUseStyles } from "react-jss";
import Navbar from "../components/Navbar";
import axios from "../axios";
import { getSearchURL, getImageBaseURL } from "../requests";

const styles = createUseStyles({
	root: {
		minHeight: "100vh",
	},
	result: {
		transition: "450ms",
		"&:hover": {
			transform: "scale(1.1)",
		},
	},
	poster: {
		height: "300px",
	},
	caption: {
		textAlign: "center",
		color: "white",
	},
	loadingImg: {
		height: "250px",
		width: "170px",
	},
});

function SearchResult() {
	const [results, setResults] = useState();
	const classes = styles();
	const location = useLocation();
	console.log(location.state);
	const fetchResults = async () => {
		const searchURL = getSearchURL(location.state);
		const request = await axios.get(searchURL);
		console.log(request);
		setResults(request.data.results);
	};
	useEffect(() => {
		window.scrollTo(0, 0);
		fetchResults();
	}, [location]);
	return (
		<div class={classes.root}>
			<Navbar />
			<div>
				<h2 className="my-5 ms-4">Search Results for " {location.state} "</h2>
				<div className="container">
					<div className="row">
						{results &&
							results.map((result, index) => {
								return (
									<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-3">
										<Link
											to={{
												pathname:
													result.media_type === "person"
														? `/person/${result.id}`
														: result.media_type === "movie"
														? `movie/details/${result.id}`
														: `tv/details/${result.id}`,
												state: {
													result: result,
													mediaType: result.mediaType,
												},
											}}
											style={{ textDecoration: "none" }}
										>
											<div
												id={result.id}
												class={`d-flex flex-column justify-content-center align-items-center ${classes.result}`}
											>
												{result?.poster_path || result?.profile_path ? (
													<img
														className={classes.poster}
														alt={result.name}
														src={`${getImageBaseURL(
															result?.poster_path || result?.profile_path
														)}`}
													/>
												) : (
													<div
														class={`placeholder-glow bg-dark ${classes.loadingImg}`}
														aria-hidden="true"
													></div>
												)}
												<h4 className={`${classes.caption} mt-2`}>
													{result?.name ||
														result?.original_title ||
														result?.original_name ||
														result?.original_title}
												</h4>
												<p className={`${classes.caption} `}>
													( {result.media_type} )
												</p>
											</div>
										</Link>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default SearchResult;
