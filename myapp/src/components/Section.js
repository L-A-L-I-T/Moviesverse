import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import axios from "../axios";
import { getImageBaseURL } from "../requests";

const styles = createUseStyles({
	title: {
		margin: "0",
		paddingLeft: "20px",
		color: "white",
	},
	rowPosters: {
		display: "flex",
		flexDirection: "row",
		padding: "20px",
		overflowY: "hidden",
		overflowX: "scroll",
		"&::-webkit-scrollbar": {
			display: "none",
		},
	},
	rowPoster: {
		height: "100%",
		width: "170px",
		marginRight: "10px",
		borderRadius: "5px",
	},
	poster: {
		borderRadius: "5px",
		marginRight: "15px",
		objectFit: "contain",
		height: "250px",
		transition: "transform 470ms",
		"&:hover": {
			transform: "scale(1.1)",
		},
	},
});

function Section(props) {
	const classes = styles();
	const [titles, setTitles] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			const request = await axios.get(props.fetchURL);
			console.log(request);
			setTitles(request.data.results);
			setLoading(false);
		};
		fetchData();
	}, [props.fetchURL]);

	return (
		<div>
			<h2 className={classes.title}>{props.title}</h2>
			<div className={classes.rowPosters}>
				{titles.map((title, index) => {
					return loading ? (
						<div></div>
					) : (
						<Link
							to={{
								pathname: `/${props.mediaType}/details/${title.id}`,
								state: {
									title: title,
								},
							}}
							id={title.id}
						>
							<img
								className={classes.poster}
								alt={title.name}
								src={`${getImageBaseURL(title.poster_path)}`}
							/>
						</Link>
					);
				})}
			</div>
		</div>
	);
}

export default Section;
