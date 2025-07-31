import db from "@/utils/db";
import Order from "@/models/order";
import User from "@/models/user";
import { getSession } from "next-auth/react";

export const config = {
	// need to add this to prevent session from being null
	api: {
		bodyParser: false,
	},
};
export default async function handler(req, res) {
	console.log("Cookies:", req.headers.cookie);

	const session = await getSession({ req }); //get the session from req object
	console.log("session is ", session);

	if (!session) {
		return res.send({ message: "Sign in required" });
	}
	console.log(session);

	const { user } = session;
	await db.connect("onlineshop");
	const newOrder = new Order({
		...req.body,
		user: user._id,
	});

	const order = await newOrder.save(); // add the new order to the db
	res.status(201).send(order);
}
