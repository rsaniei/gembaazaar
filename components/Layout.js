import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/Cart";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { ShoppingCart, User, LogIn } from "lucide-react";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from "@headlessui/react";

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
					<Disclosure as="nav" className="bg-white border-b border-gray-200">
						{({ open }) => (
							<>
								<div className="flex justify-between items-center h-20 px-4 sm:px-8">
									{/* Left: Mobile Menu Button */}
									<div className="flex items-center gap-2">
										<Disclosure.Button className="md:hidden p-2 rounded hover:bg-gray-100">
											{open ? (
												<svg
													className="h-6 w-6"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M6 18L18 6M6 6l12 12"
													/>
												</svg>
											) : (
												<svg
													className="h-6 w-6"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M4 6h16M4 12h16M4 18h16"
													/>
												</svg>
											)}
										</Disclosure.Button>

										{/* Logo */}
										<Link
											href="/"
											className="flex items-center gap-2 text-lg font-bold"
										>
											<Image
												src="/logo2.png"
												width={40}
												height={40}
												alt="logo"
											/>
											<span>Gem Baazaar</span>
										</Link>
									</div>

									{/* Desktop Links */}
									<div className="hidden md:flex gap-10">
										<Menu as="div" className="relative text-life inline-block">
											<MenuButton>Jewelry</MenuButton>
											<MenuItems className="absolute left-0 mt-2 py-2 bg-white shadow-lg z-50 border border-gray-200 ">
												<MenuItem className="data-focus:underline data-focus:decoration-1 data-focus: decoration-gray-500">
													<DropDown className="flex px-4 py-3" href="">
														All
													</DropDown>
												</MenuItem>
												<MenuItem className="data-focus:underline data-focus:decoration-1 data-focus: decoration-gray-500">
													<DropDown
														className="flex px-4 py-2"
														href="/?category=earrings"
													>
														Earrings
													</DropDown>
												</MenuItem>
												<MenuItem className="data-focus:underline data-focus:decoration-1 data-focus: decoration-gray-500">
													<DropDown
														className="flex px-4 py-2"
														href="/?category=necklace"
													>
														Necklaces
													</DropDown>
												</MenuItem>
												<MenuItem className="data-focus:underline data-focus:decoration-1 data-focus: decoration-gray-500">
													<DropDown
														className="flex px-4 py-2"
														href="/?category=bracelet"
													>
														Bracelets
													</DropDown>
												</MenuItem>
												<MenuItem className="data-focus:underline data-focus:decoration-1 data-focus: decoration-gray-500">
													<DropDown
														className="flex px-4 py-2"
														href="/?category=ring"
													>
														Rings
													</DropDown>
												</MenuItem>
											</MenuItems>
										</Menu>
										<Link href="/belts">Belts</Link>
										<Link href="/handbags">Handbags</Link>
										<Link href="/sale">Sale</Link>
										<Link href="/contact">Contact</Link>
									</div>

									{/* Right: Cart & User Menu */}
									<div className="flex items-center gap-x-4">
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
															"absolute right-0 w-56 bg-white p-4 origin-top-right border border-gray-300 shadow-lg z-50"
														}
													>
														<MenuItem>
															<DropDown
																className={"flex p-2"}
																href={"/profile"}
															>
																Profile
															</DropDown>
														</MenuItem>
														<MenuItem>
															<DropDown
																className={"flex p-2"}
																href={"/order-history"}
															>
																Order history
															</DropDown>
														</MenuItem>
														{session.user.isAdmin && (
															<MenuItem>
																<DropDown
																	className={"flex p-2"}
																	href={"/admin/dashboard"}
																>
																	Dashboard
																</DropDown>
															</MenuItem>
														)}
														<MenuItem>
															<a
																className={"flex p-2"}
																href={"#"}
																onClick={logoutHandler}
															>
																Logout
															</a>
														</MenuItem>
													</MenuItems>
												</Menu>
											) : (
												<Link
													href="/login"
													className="flex items-center gap-1 p-2"
												>
													<LogIn size={20} />
												</Link>
											)}
										</div>
									</div>
								</div>

								{/* Mobile dropdown */}
								<DisclosurePanel className="md:hidden flex flex-col items-center gap-4 px-4 py-2 border-t">
									<Disclosure>
										{({ open }) => (
											<>
												<DisclosureButton>
													<span>Jewelry</span>
												</DisclosureButton>
												<DisclosurePanel className="pl-6 flex flex-col gap-2">
													<Link
														href="/?category=earrings"
														className="hover:underline"
													>
														Earrings
													</Link>
													<Link
														href="/?category=rings"
														className="hover:underline"
													>
														Rings
													</Link>
													<Link
														href="/?category=necklaces"
														className="hover:underline"
													>
														Necklaces
													</Link>
													<Link
														href="/?category=bracelets"
														className="hover:underline"
													>
														Bracelets
													</Link>
												</DisclosurePanel>
											</>
										)}
									</Disclosure>
									{/* <Link>Jewelry</Link> */}
									<Link href="/belts">Belts</Link>
									<Link href="/handbags">Handbags</Link>
									<Link href="/sale">Sale</Link>
									<Link href="/contact">Contact</Link>
								</DisclosurePanel>
							</>
						)}
					</Disclosure>
				</header>
				<main className="container m-auto px-12">{children}</main>
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
