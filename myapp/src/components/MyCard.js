import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Card,
	CardActions,
	CardActionArea,
	CardContent,
	CardMedia,
} from "@material-ui/core";

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
});

export default function MyCard(props) {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					component="img"
					className={classes.media}
					src={props.image}
				/>
				<CardContent>{props.title}</CardContent>
			</CardActionArea>
		</Card>
	);
}
