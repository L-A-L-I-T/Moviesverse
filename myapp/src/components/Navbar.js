import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
function Navbar(props) {
	const [searchInput, setSearchInput] = useState("");
	const handleChange = (e) => {
		setSearchInput(e.target.value);
	};
	return (
		<nav
			className="navbar sticky-top navbar-expand-lg navbar-dark"
			style={{ background: "#181818" }}
		>
			<div class="container-fluid">
				<Link style={{ textDecoration: "none" }} to="/">
					<a class="navbar-brand">Moviesverse</a>
				</Link>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						<li class="nav-item">
							<Link style={{ textDecoration: "none" }} to="/movies">
								<a
									style={
										props.mediaType === "movie" ? { color: "#ffc107" } : {}
									}
									className="nav-link active"
									aria-current="movie"
								>
									Movies
								</a>
							</Link>
						</li>
						<li class="nav-item">
							<Link style={{ textDecoration: "none" }} to="/tv">
								<a
									style={props.mediaType === "tv" ? { color: "#ffc107" } : {}}
									class="nav-link active"
									aria-current="tv"
								>
									TV Shows
								</a>
							</Link>
						</li>
					</ul>
					<form class="d-flex col-lg-4">
						<input
							class="form-control me-3 my-2"
							type="search"
							placeholder="Search movies,tv shows,actor..."
							aria-label="Search"
							style={{ borderRadius: "5px" }}
							onChange={handleChange}
						/>
						<Link to={{ pathname: `/search_results`, state: searchInput }}>
							<button
								class="btn btn-outline-warning my-2 me-4"
								type="submit"
								style={{ borderRadius: "5px" }}
							>
								Search
							</button>
						</Link>
					</form>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
