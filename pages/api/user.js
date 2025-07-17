import db from "../../utils/db";
import User from "../../models/user";
import userItem from "../../data/users.json";
async function handler(req, res) {
	await db.connect("onlineshop");
	await User.insertMany(userItem);
	res.send({ message: "User added!" });
}
export default handler;
