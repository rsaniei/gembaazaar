import db from "@/utils/db";
import Order from "@/models/order";
import User from "@/models/user";
import Product from "@/models/product";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
	const session = await getServerSession(req, res, authOptions);

	if (!session || (session && !session.user.isAdmin)) {
		return res.send({ message: "Sign in required" });
	}
	await db.connect("/onlineshop");
	const ordersCount = await Order.countDocuments();
	const productsCount = await Product.countDocuments();
	const usersCount = await User.countDocuments();

	res.send([{ ordersCount, productsCount, usersCount }]);
}
