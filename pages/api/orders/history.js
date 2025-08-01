import db from "@/utils/db";
import Order from "@/models/order";
import User from "@/models/user";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.send({ message: "Sign in required" });
	}
	const { user } = session;
	await db.connect("onlineshop");

	const orders = await Order.find({ user: user._id });
	res.send(orders);
}
