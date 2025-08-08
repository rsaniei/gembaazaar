import Head from "next/head";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/Cart";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { ShoppingCart, User, LogIn } from "lucide-react";

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
					<nav className="flex h-14 px-8 justify-between items-center border-b-1 border-gray-700 bg-white">
						<Link href="/" className="text-lg font-bold">
							Gem Baazaar
						</Link>
						<div className="flex items-center gap-x-4">
							<Link href="/cart" className="relative p-2">
								<ShoppingCart size={24} className="text-gray-700" />
								{cartItemsCount > 0 && (
									<span className="absolute bottom-2 right-1 translate-x-1/2 translate-y-1/2 rounded-full bg-gray-500 text-white text-[10px] px-1.5 py-0.5 font-bold leading-none">
										{cartItemsCount}
									</span>
								)}
							</Link>
							{status === "loading" ? (
								"Loading"
							) : session?.user ? (
								<Menu as="div" className={"relative inline-block"}>
									<MenuButton className="flex items-center gap-1 cursor-pointer">
										<User size={20} />
										<span>{session.user.name}</span>
									</MenuButton>
									<MenuItems
										className={
											"absolute right-0 w-56 bg-white p-4 origin-top-right border border-gray-300 shadow-lg rounded-md z-50"
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
										{session.user.isAdmin && (
											<MenuItem>
												<DropDown
													className={"flex p-2"}
													href={"/admin/dashboard"}
												>
													{" "}
													Dashboard{" "}
												</DropDown>
											</MenuItem>
										)}
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
								<Link href="/login" className="flex items-center gap-1 p-2">
									<LogIn size={20} />
								</Link>
							)}
						</div>
					</nav>
				</header>
				<main className="container m-auto mt-4 px-12">{children}</main>
				<footer className="flex flex-row gap-5 text-sm justify-center items-center h-10 py-20 border-t border-gray-300">
					<div>© 2025, Gem Baazaar</div>
					<div>Refund policy</div>
					<div>Contact information</div>
					<div>Terms of service</div>
					<div>Privacy policy</div>
					<div>Cookie preferences</div>
				</footer>
			</div>
		</>
	);
}
