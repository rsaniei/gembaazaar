import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/Cart";

export default function Layout({ children, title }) {
	const { state, dispatch } = useContext(CartContext);
	const { cart } = state;
	const [cartItemsCount, setCartItemsCount] = useState(0);
	const { status, data: session } = useSession();

	useEffect(() => {
		setCartItemsCount(cart.cartItems.reduce((acc, cur) => acc + cur.qty, 0));
	}, [cart.cartItems]);

	return (
		<>
			<Head>
				<title>{`${title} - Shopping`}</title>
			</Head>
			<div className="flex min-h-screen flex-col justify-between">
				<header>
					<nav className="flex h-14 px-8 justify-between items-center border-b-4 bg-white">
						<Link href="/" className="text-lg font-bold">
							Shopping Logo
						</Link>
						<div>
							<Link href="/cart" className="p-2">
								Cart
								{cart.cartItems.length > 0 && (
									<span className="ml-1 rounded-xl bg-gray-200 px-2 py-1 text-xs font-bold">
										{/* calculate the sum of qtys */}
										{cartItemsCount}
									</span>
								)}
							</Link>
							{status === "loading" ? (
								"Loading"
							) : session?.user ? (
								session.user.name
							) : (
								<Link href="/login" className="p-2">
									Login
								</Link>
							)}
						</div>
					</nav>
				</header>
				<main className="container m-auto mt-4 px-4">{children}</main>
				<footer className="flex justify-center items-center h-10">
					Footer
				</footer>
			</div>
		</>
	);
}
