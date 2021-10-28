import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createUseStyles } from "react-jss";
import axios from "../axios";
import { getDetailsURL, getImageBaseURL } from "../requests";
import Navbar from "../components/Navbar";
import Images from "../components/Images";
import Credits from "../components/Credits";

const styles = createUseStyles({
	root: {
		minHeight: "100vh",
	},
	profilePhoto: {
		height: "500px",
		borderRadius: "10px",
		objectFit: "cover",
	},
});

function Person() {
	const classes = styles();
	const [person, setPerson] = useState();
	const { person_id } = useParams();
	const fetchPerson = async () => {
		const fetchURL = getDetailsURL("person", person_id);
		const request = await axios.get(fetchURL);
		console.log(request);
		setPerson(request.data);
	};
	useEffect(() => {
		window.scrollTo(0, 0);
		fetchPerson();
	}, []);
	return (
		<div className={classes.root}>
			<Navbar />
			<div className="container">
				<div className="row mt-5">
					<div className="col-lg-7">
						<h3>{person?.name}</h3>
						<p>{person?.biography}</p>
						<p>Date of Birth : {person?.birthday}</p>
						<p>Place of Birth : {person?.place_of_birth}</p>
					</div>
					<div className="col-lg-5 d-flex justify-content-center align-items-start mt-4">
						<img
							className={classes.profilePhoto}
							src={getImageBaseURL(person?.profile_path)}
							alt={person?.name}
						/>
					</div>
				</div>
			</div>
			<Images mediaType="person" id={person_id} />
			<Credits id={person_id} />
		</div>
	);
}

export default Person;
