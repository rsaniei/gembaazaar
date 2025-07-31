import db from "@/utils/db";
import Order from "@/models/order";
import User from "@/models/user";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

// export const config = {
// 	// need to add this to prevent session from being null
// 	api: {
// 		bodyParser: false,
// 	},
// };
export default async function handler(req, res) {
	// const session = await getSession({ req }); //get the session from req object
	const session = await getServerSession(req, res, authOptions);
	console.log("session:=>");
	// console.log(req.body);
	console.log(session);

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
