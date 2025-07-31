import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/utils/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export const authOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				await db.connect();
				const user = await User.findOne({ email: credentials.email });
				if (user && bcrypt.compareSync(credentials.password, user.password)) {
					return {
						_id: user._id.toString(),
						name: user.name,
						email: user.email,
						isAdmin: user.isAdmin,
					};
				}
				throw new Error("Invalid credentials");
			},
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60,
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token._id = user._id;
				token.isAdmin = user.isAdmin;
			}
			return token;
		},
		async session({ session, token }) {
			if (token?._id) session.user._id = token._id;
			if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	cookies: {
		sessionToken: {
			name: `next-auth.session-token`,
			options: {
				httpOnly: true,
				sameSite: "lax",
				path: "/",
				secure: process.env.NODE_ENV === "production", // خیلی مهم!
			},
		},
	},
};

export default NextAuth(authOptions);

// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import db from "@/utils/db";
// import User from "@/models/user";

// export const authOptions = {
//  secret: process.env.NEXTAUTH_SECRET,
// 	session: {
// 		strategy: "jwt",
// 		maxAge: 30 * 24 * 60 * 60, // Session expiration (30 days)
// 	},
// 	cookies: {
// 		sessionToken: {
// 			name: `next-auth.session-token`,
// 			options: {
// 				httpOnly: true,
// 				sameSite: "lax",
// 				path: "/",
// 				secure: process.env.NODE_ENV === "production", // فقط در production
// 			},
// 		},
// 	},
// 	callbacks: {
// 		// will be called on sig-in
// 		async jwt({ token, user }) {
// 			// if (user?._id) token._id = user._id; // Add user data to token on sign-in
// 			// if (user?.isAdmin) token.isAdmin = user.isAdmin; //Set isAdmin to true for the token

// 			// return token;
// 			if (user) {
// 				// just in the login phase
// 				token._id = user._id;
// 				token.isAdmin = user.isAdmin;
// 			}
// 			return token;
// 		},

// 		//session is a data object that holds user-related info (like id, email, role, etc.).
// 		//set the session according to the token value
// 		//session contains part of the token info which is enought to display the UI
// 		async session({ session, token }) {
// 			if (token._id) session.user._id = token._id;
// 			if (token.isAdmin) session.user.isAdmin = token.isAdmin;
// 			return session;
// 		},
// 	},
// 	//how the auth is gonna be done: credentials, OAuth, etc.
// 	providers: [
// 		CredentialsProvider({
// 			//here we compare the credentials with what we have in DB
// 			async authorize(credentials) {
// 				await db.connect();
// 				const user = await User.findOne({ email: credentials.email });
// 				if (user && bcrypt.compareSync(credentials.password, user.password)) {
// 					return {
// 						_id: user._id.toString(),
// 						name: user.name,
// 						email: user.email,
// 						image: "a",
// 						isAdmin: user.isAdmin,
// 					};
// 				}

// 				//if credentials are not correct
// 				throw new Error("Invalid Email or Password");
// 			},
// 		}),
// 	],
// };
// export default NextAuth(authOptions);
