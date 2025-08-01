import "@/styles/globals.css";
import { CartContextProvider } from "../context/Cart.js";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router.js";

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<div className="bg-gray-100">
			<SessionProvider session={session}>
				<CartContextProvider>
					{/* if the component needs authentication wrap it with Auth to check if the user is logged in */}
					{Component.auth ? (
						<Auth adminOnly={Component.auth.adminOnly}>
							<Component {...pageProps} />
						</Auth>
					) : (
						<Component {...pageProps} />
					)}
				</CartContextProvider>
			</SessionProvider>
		</div>
	);
}

function Auth({ children, adminOnly }) {
	const router = useRouter();
	const { status, data: session } = useSession({
		required: true,
		onUnauthenticated() {
			router.push("/unauthorized");
		},
	});

	if (adminOnly && !session.user.isAdmin) {
		router.push("/unauthorized");
	}
	if (status === "loading") {
		return "Loading";
	}

	return children;
}
