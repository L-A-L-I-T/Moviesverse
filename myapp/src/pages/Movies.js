import React, { useState, useEffect } from "react";
import Section from "../components/Section";
import axios from "../axios";
import { fetchTrending, getGenresURL, fetchGenreTitles } from "../requests";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
function Movies() {
	const [genres, setGenres] = useState();
	const getGenres = async () => {
		const fetchURL = getGenresURL("movie");
		const request = await axios.get(fetchURL);
		setGenres(request.data.genres);
	};
	console.log(genres);
	useEffect(() => {
		window.scrollTo(0, 0);
		getGenres();
	}, []);
	return (
		<div>
			<Navbar mediaType="movie" />
			<Banner mediaType="movie" />
			<Section
				title="Trending"
				fetchURL={fetchTrending("movie")}
				mediaType="movie"
			/>
			{genres &&
				genres.map((genre, index) => {
					return (
						<Section
							title={genre.name}
							fetchURL={fetchGenreTitles("movie", genre.id)}
							mediaType="movie"
						/>
					);
				})}
		</div>
	);
}

export default Movies;
