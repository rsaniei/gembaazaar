import "@/styles/globals.css";
import { CartContextProvider } from "../context/Cart.js";

import { SessionProvider } from "next-auth/react";

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<div className="bg-gray-100">
			<SessionProvider session={session}>
				<CartContextProvider>
					<Component {...pageProps} />
				</CartContextProvider>
			</SessionProvider>
		</div>
	);
}
