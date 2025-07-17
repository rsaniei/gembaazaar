import mongoose from "mongoose";
import mpmgoose from "mongoose";

async function connect() {
	// mongoose.connect("mongodb://127.0.0.1:27017/onlineShop");
	await mongoose.connect(
		"mongodb+srv://sanieir:12345@cluster0.eiotlzn.mongodb.net/onlineshop?retryWrites=true&w=majority&appName=Cluster0"
	);

	console.log("Connected to DB");
}

const db = { connect };
export default db;
