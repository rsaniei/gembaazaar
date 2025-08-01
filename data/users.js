import bcrypt from "bcryptjs";

const users = [
	{
		name: "user1",
		email: "user1@gmail.com",
		password: bcrypt.hashSync("12345678"),
		isAdmin: true,
	},
	{
		name: "user2",
		email: "user2@gmail.com",
		password: bcrypt.hashSync("12345678"),
		isAdmin: false,
	},
	{
		name: "admin",
		email: "admin@gmail.com",
		password: bcrypt.hashSync("12345678"),
		isAdmin: true,
	},
];

export default users;
