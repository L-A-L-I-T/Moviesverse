import React, { useState, useEffect } from "react";
import axios from "../axios";
import { getReviewsURL } from "../requests";

function truncate(str, n) {
	return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

function Review(props) {
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

	return (
		<div className="ms-4 mb-5">
			<h3>Reviews ({reviews?.length})</h3>
			{reviews?.length > 0 && (
				<>
					<div
						id="carouselExampleControls"
						class="carousel slide"
						data-bs-ride="carousel"
					>
						<div class="carousel-inner">
							{!loading &&
								reviews?.map((review, index) => {
									const css =
										review.id === activeID
											? "carousel-item active"
											: "carousel-item";
									return (
										<>
											<div className={`${css}`}>
												<div class="row justify-content-center align-items-center">
													<div
														class="col-8 py-5 align-items-center"
														style={{
															textAlign: "center",
															color: "white",
														}}
													>
														<p class="h-100 d-flex justify-content-center align-items-center">
															{truncate(review.content, 500)}
														</p>
													</div>
												</div>
											</div>
										</>
									);
								})}
						</div>
						<button
							class="carousel-control-prev"
							type="button"
							data-bs-target="#carouselExampleControls"
							data-bs-slide="prev"
						>
							<span
								class="carousel-control-prev-icon"
								aria-hidden="true"
							></span>
							<span class="visually-hidden">Previous</span>
						</button>
						<button
							class="carousel-control-next"
							type="button"
							data-bs-target="#carouselExampleControls"
							data-bs-slide="next"
						>
							<span
								class="carousel-control-next-icon"
								aria-hidden="true"
							></span>
							<span class="visually-hidden">Next</span>
						</button>
					</div>
				</>
			)}
		</div>
	);
}

export default Review;
