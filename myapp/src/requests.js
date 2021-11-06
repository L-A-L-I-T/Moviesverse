const API_KEY = process.env.REACT_APP_API_KEY;

export const getGenresURL = (media_type) => {
	console.log(API_KEY);
	return `/genre/${media_type}/list?api_key=${API_KEY}&language=en-US`;
};

export const fetchTrending = (media_type) =>
	`/trending/${media_type}/week?api_key=${API_KEY}&language=en-US`;

export const fetchNetflixOriginals = (media_type) => {
	return `/discover/${media_type}?api_key=${API_KEY}&with_networks=213`;
};
export const fetchTopRated = (media_type) => {
	return `/${media_type}/top_rated?api_key=${API_KEY}&language=en-US`;
};
export const fetchUpcomingMovies = (media_type) => {
	return `/${media_type}/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
};
export const fetchGenreTitles = (media_type, genre_id) => {
	return `/discover/${media_type}?api_key=${API_KEY}&with_genres=${genre_id}`;
};
export const fetchHindiMovies = (media_type) => {
	return `/discover/movie?api_key=${API_KEY}&region=IN&language=hi-IN&release_date.gte=2020-01-01&with_release_type=3|2&with_original_language=hi`;
};

export const getImageBaseURL = (img_path) => {
	return `https://image.tmdb.org/t/p/original/${img_path}`;
};

export const getImageURL = (media_type, id) => {
	return `/${media_type}/${id}/images?api_key=${API_KEY}`;
};
export const getSeasonImageURL = (tv_id, season_id) => {
	return `/tv/${tv_id}/season/${season_id}/images?api_key=${API_KEY}`;
};
export const getVidoesURL = (media_type, id) => {
	return `/${media_type}/${id}/videos?api_key=${API_KEY}`;
};
export const getSeasonVideoURL = (tv_id, season_id) => {
	return `/tv/${tv_id}/season/${season_id}/videos?api_key=${API_KEY}`;
};

export const getMovieCreditsURL = (movie_id) => {
	return `/movie/${movie_id}/credits?api_key=${API_KEY}`;
};

export const getSeasonCreditsURL = (tv_id, season_id) => {
	return `/tv/${tv_id}/season/${season_id}/aggregate_credits?api_key=${API_KEY}`;
};

export const getDetailsURL = (media_type, id) => {
	return `/${media_type}/${id}?api_key=${API_KEY}`;
};

export const getReviewsURL = (media_type, id) => {
	return `/${media_type}/${id}/reviews?api_key=${API_KEY}&language=en-US`;
};

export const getSimilarURL = (media_type, id) => {
	return `/${media_type}/${id}/similar?api_key=${API_KEY}`;
};
export const getRecommendedURL = (media_type, id) => {
	return `/${media_type}/${id}/recommendations?api_key=${API_KEY}`;
};

export const getSeasonURL = (id, season_id) => {
	return `/tv/${id}/season/${season_id}?api_key=${API_KEY}&language=en-US`;
};

export const getSearchURL = (query) => {
	return `/search/multi?api_key=${API_KEY}&language=en-US&query=${query}`;
};

export const getCreditsURL = (media_type, id) => {
	return `/person/${id}/${media_type}_credits?api_key=${API_KEY}&language=en-US`;
};

export const rateURL = (media_type, id) => {
	return `/${media_type}/${id}/rating?api_key=${API_KEY}`;
};
