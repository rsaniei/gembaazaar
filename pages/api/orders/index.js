import db from "@/utils/db";
import Order from "@/models/order";
import User from "@/models/user";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
	// const session = await getSession({ req }); //get the session from req object
	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		return res.send({ message: "Sign in required" });
	}

	const { user } = session;
	await db.connect("onlineshop");
	const newOrder = new Order({
		...req.body,
		user: user._id,
	});

	const order = await newOrder.save(); // add the new order to the db
	res.status(201).send(order);
}
