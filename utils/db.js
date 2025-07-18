import mongoose from "mongoose";

async function connect() {
	// mongoose.connect("mongodb://127.0.0.1:27017/onlineShop");
	await mongoose.connect(
		"mongodb+srv://sanieir:12345@cluster0.eiotlzn.mongodb.net/onlineshop?retryWrites=true&w=majority&appName=Cluster0"
	);

	console.log("Connected to DB");
}

//convert mongodb docs to JSON objects
function convertToObject(doc) {
	doc._id = doc._id.toString();
	return doc;
}
const db = { connect, convertToObject };
export default db;
