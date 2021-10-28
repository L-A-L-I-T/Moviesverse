import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Movies from "./pages/Movies";
import TV from "./pages/TV";
import MovieDetails from "./pages/MovieDetails";
import TVDetails from "./pages/TVDetails";
import SearchResult from "./pages/SearchResult";
import Person from "./pages/Person";

function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					<Redirect to="/movies" />
				</Route>
				<Route exact path="/movies" component={Movies}></Route>
				<Route exact path="/tv" component={TV}></Route>
				<Route
					exact
					path="/movie/details/:movie_id"
					component={MovieDetails}
				></Route>
				<Route exact path="/tv/details/:tv_id" component={TVDetails}></Route>
				<Route
					exact
					path="/tv/details/:tv_id/season_details"
					component={TVDetails}
				></Route>
				<Route exact path="/search_results" component={SearchResult}></Route>
				<Route exact path="/person/:person_id" component={Person}></Route>
			</Switch>
		</BrowserRouter>
	);
}

export default Routes;
