import db from "../../utils/db";
import User from "../../models/user";
import users from "../../data/users";

async function handler(req, res) {
	await db.connect("onlineshop");
	await User.deleteMany();
	await User.insertMany(users);
	res.send({ message: "User added!" });
}
export default handler;
