import db from "@/utils/db";
import User from "@/models/user";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
	const session = await getServerSession(req, res, authOptions);

	if (!session || (session && !session.user.isAdmin)) {
		return res.status(401).send({ message: "Sign in required" });
	}
	await db.connect("/onlineshop");
	const users = await User.find();

	res.send(users);
}
