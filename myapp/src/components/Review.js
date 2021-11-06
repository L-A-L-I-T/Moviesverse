import React, { useState, useEffect } from "react";
import axios from "../axios";
import { getReviewsURL } from "../requests";
import { createUseStyles } from "react-jss";
function truncate(str, n) {
	return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

const styles = createUseStyles({
	slider: {
		minHeight: "300px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	reviewContent: {
		minHeight: "300px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	"@media (max-width: 768px)": {
		slider: {
			minHeight: "350px",
		},
		reviewContent: {
			minHeight: "350px",
		},
	},
});

function Review(props) {
	const classes = styles();
	const [reviews, setReviews] = useState();
	const [loading, setLoading] = useState(true);
	const activeID = reviews && reviews.length > 0 && reviews[0].id;
	const fetchReviews = async () => {
		let fetchURL = getReviewsURL(props.mediaType, props.id);
		let request = await axios.get(fetchURL);
		request = await axios.get(fetchURL);
		setReviews(request.data.results);
	};

	useEffect(() => {
		fetchReviews();
		setLoading(false);
	}, [props.id]);
	console.log(reviews);

	const [windowSize, setWindowSize] = useState(null);
	useEffect(() => {
		const handleResize = () => {
			setWindowSize(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="ms-4 mb-5">
			<h3>Reviews ({reviews?.length})</h3>
			{reviews?.length > 0 && (
				<div
					id="carouselExampleControls"
					className={`carousel slide ${classes.slider}`}
					data-bs-ride="carousel"
				>
					<div className="carousel-inner w-75">
						{!loading &&
							reviews?.map((review, index) => {
								const css =
									review.id === activeID
										? "carousel-item active"
										: "carousel-item";
								return (
									<div className={`${css}`}>
										<div className="d-flex justify-content-center align-items-center">
											<p className={`${classes.reviewContent}`}>
												{windowSize < 769
													? truncate(review.content, 300)
													: truncate(review.content, 500)}
											</p>
										</div>
									</div>
								);
							})}
					</div>
					<button
						class="carousel-control-prev"
						type="button"
						data-bs-target="#carouselExampleControls"
						data-bs-slide="prev"
					>
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Previous</span>
					</button>
					<button
						class="carousel-control-next"
						type="button"
						data-bs-target="#carouselExampleControls"
						data-bs-slide="next"
					>
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Next</span>
					</button>
				</div>
			)}
		</div>
	);
}

export default Review;
