import React, { useState, useEffect } from "react";
import Section from "../components/Section";
import axios from "../axios";
import {
	fetchTrending,
	getGenresURL,
	fetchGenreTitles,
	fetchNetflixOriginals,
} from "../requests";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
function TV() {
	const [genres, setGenres] = useState();
	const getGenres = async () => {
		const fetchURL = getGenresURL("tv");
		const request = await axios.get(fetchURL);
		setGenres(request.data.genres);
	};
	useEffect(() => {
		window.scrollTo(0, 0);
		getGenres();
	}, []);
	console.log(genres);
	return (
		<div>
			<Navbar mediaType="tv" />
			<Banner mediaType="tv" />
			<Section title="Trending" fetchURL={fetchTrending("tv")} mediaType="tv" />
			<Section
				title="Netflix Originals"
				fetchURL={fetchNetflixOriginals("tv")}
				mediaType="tv"
			/>
			{genres &&
				genres.map((genre, index) => {
					return (
						<Section
							title={genre.name}
							fetchURL={fetchGenreTitles("tv", genre.id)}
							mediaType="tv"
						/>
					);
				})}
		</div>
	);
}

export default TV;
