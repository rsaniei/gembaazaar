import db from "@/utils/db";
import Product from "@/models/product";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
	const session = await getServerSession(req, res, authOptions);

	if (!session || (session && !session.user.isAdmin)) {
		return res.status(401).send({ message: "Sign in required" });
	}
	await db.connect("/onlineshop");
	const products = await Product.find();

	res.send(products);
}
