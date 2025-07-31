import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import db from "@/utils/db";
import User from "@/models/user";

export const authOptions = {
	session: {
		strategy: "jwt",
	},
	callbacks: {
		// will be called on sig-in
		async jwt({ token, user }) {
			console.log("JWT callback called:", { token, user });

			// if (user?._id) token._id = user._id; // Add user data to token on sign-in
			// if (user?.isAdmin) token.isAdmin = user.isAdmin; //Set isAdmin to true for the token

			// return token;
			if (user) {
				// just in the login phase
				token._id = user._id;
				token.isAdmin = user.isAdmin;
			}
			return token;
		},

		//session is a data object that holds user-related info (like id, email, role, etc.).
		//set the session according to the token value
		//session contains part of the token info which is enought to display the UI
		async session({ session, token }) {
			if (token._id) session.user._id = token._id;
			if (token.isAdmin) session.user.isAdmin = token.isAdmin;
			return session;
		},
	},
	//how the auth is gonna be done: credentials, OAuth, etc.
	providers: [
		CredentialsProvider({
			//here we compare the credentials with what we have in DB
			async authorize(credentials) {
				await db.connect();
				const user = await User.findOne({ email: credentials.email });
				if (user && bcrypt.compareSync(credentials.password, user.password)) {
					return {
						_id: user._id.toString(),
						name: user.name,
						email: user.email,
						image: "a",
						isAdmin: user.isAdmin,
					};
				}

				//if credentials are not correct
				throw new Error("Invalid Email or Password");
			},
		}),
	],
};
export default NextAuth(authOptions);
