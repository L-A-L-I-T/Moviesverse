import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import axios from "../axios";
import { getImageURL, getImageBaseURL, getSeasonImageURL } from "../requests";

const styles = createUseStyles({
	posterImg: {
		height: "230px",
		marginRight: "20px",
		borderRadius: "5px",
		transition: "transform 470ms",
		"&:hover": {
			transform: "scale(0.95)",
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
});

function Images(props) {
	const classes = styles();
	const [images, setImages] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchImages = async () => {
			let fetchURL = props.season_id
				? getSeasonImageURL(props.id, props.season_id)
				: getImageURL(props.mediaType, props.id);
			let request = await axios.get(fetchURL);
			setImages(
				request.data.backdrops || request.data.profiles || request.data.posters
			);
		};
		fetchImages();
		setLoading(false);
	}, [props.season_id, props.id, props.mediaType]);
	return (
		<div>
			<h3 className="ms-4">{props.season_id ? "Posters" : "Images"}</h3>
			<div className={classes.rowImages}>
				{!loading && images?.length > 0 ? (
					images?.map((image, index) => {
						return (
							<img
								className={classes.posterImg}
								src={getImageBaseURL(image.file_path)}
								alt="img"
								id={image.file_path}
							/>
						);
					})
				) : (
					<div>{props.season_id ? "No Posters" : "No Images"}</div>
				)}
			</div>
		</div>
	);
}

export default Images;
