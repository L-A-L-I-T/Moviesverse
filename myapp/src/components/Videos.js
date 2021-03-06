import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { createUseStyles } from "react-jss";
import axios from "../axios";
import { getVidoesURL, getSeasonVideoURL } from "../requests";

const styles = createUseStyles({
	rowVideos: {
		display: "flex",
		flexDirection: "row",
		alignItems: "flexStart",
		margin: "20px",
		overflowY: "hidden",
		overflowX: "scroll",
		"&::-webkit-scrollbar": {
			display: "none",
		},
	},
	rowVideo: {
		marginRight: "20px",
	},
});

function Videos(props) {
	const classes = styles();
	const [videos, setVideos] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchVideos = async () => {
			let fetchURL = props.season_id
				? getSeasonVideoURL(props.id, props.season_id)
				: getVidoesURL(props.mediaType, props.id);
			let request = await axios.get(fetchURL);
			console.log(request);
			if (request.data.results.length === 0) {
				fetchURL = getVidoesURL(props.mediaType, props.id);
				request = await axios.get(fetchURL);
			}
			setVideos(request.data.results);
			setLoading(false);
		};
		fetchVideos();
	}, [props.season_id, props.id, props.mediaType]);
	const [windowSize, setWindowSize] = useState(null);
	useEffect(() => {
		const handleResize = () => {
			setWindowSize(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const opts = {
		height: windowSize < 769 ? "220" : "250",
		width: windowSize < 769 ? "320" : "470",
		playerVars: {
			autoplay: 0,
		},
	};

	// const opts = {
	// 	height: "250",
	// 	width: "470",
	// 	playerVars: {
	// 		autoplay: 0,
	// 	},
	// };

	return (
		<div>
			<h3 className="ms-4 mt-3">Videos ({videos?.length})</h3>
			<div className={classes.rowVideos}>
				{!loading &&
					videos.map((video, index) => {
						return (
							<div className={classes.rowVideo} id={video.id}>
								<YouTube videoId={video.key} opts={opts} />
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default Videos;
