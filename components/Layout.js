import Head from "next/head";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/Cart";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import DropDown from "./DropDown";

export default function Layout({ children, title }) {
	const { state, dispatch } = useContext(CartContext);
	const { cart } = state;
	const [cartItemsCount, setCartItemsCount] = useState(0);
	const { status, data: session } = useSession();

	useEffect(() => {
		setCartItemsCount(cart.cartItems.reduce((acc, cur) => acc + cur.qty, 0));
	}, [cart.cartItems]);

	function logoutHandler() {
		Cookies.remove();
		//go to login page after signout
		signOut({ callbackUrl: "/login" });
	}
	return (
		<>
			<Head>
				<title>{`${title} - Shopping`}</title>
			</Head>
			<ToastContainer position="bottom-center" limit={1} autoClose={2000} />
			<div className="flex min-h-screen flex-col justify-between">
				<header>
					<nav className="flex h-14 px-8 justify-between items-center border-b-4 bg-white">
						<Link href="/" className="text-lg font-bold">
							Shopping Logo
						</Link>
						<div>
							<Link href="/cart" className="p-2">
								Cart
								<span className="ml-1 rounded-xl bg-gray-200 px-2 py-1 text-xs font-bold">
									{/* calculate the sum of qtys */}
									{cartItemsCount}
								</span>
							</Link>
							{status === "loading" ? (
								"Loading"
							) : session?.user ? (
								<Menu as="div" className={"relative inline-block"}>
									<MenuButton className={"text-blue-500"}>
										{session.user.name}
									</MenuButton>
									<MenuItems
										className={
											"absolute right-0 w-56 bg-white p-4 origin-top-right border-slate-500"
										}
									>
										<MenuItem>
											<DropDown className={"flex p-2"} href={"/profile"}>
												{" "}
												Profile{" "}
											</DropDown>
										</MenuItem>
										<MenuItem>
											<DropDown className={"flex p-2"} href={"/order-history"}>
												{" "}
												Order history{" "}
											</DropDown>
										</MenuItem>
										<MenuItem>
											<a
												className={"flex p-2"}
												href={"#"}
												onClick={logoutHandler}
											>
												{" "}
												Logout{" "}
											</a>
										</MenuItem>
									</MenuItems>
								</Menu>
							) : (
								<Link href="/login" className="p-2">
									Login
								</Link>
							)}
						</div>
					</nav>
				</header>
				<main className="container m-auto mt-4 px-12">{children}</main>
				<footer className="flex justify-center items-center h-10">
					Footer
				</footer>
			</div>
		</>
	);
}
