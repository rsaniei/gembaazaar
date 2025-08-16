import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useContext } from "react";
import { CartContext } from "@/context/Cart";
import Layout from "@/components/Layout";
import CheckoutWizard from "@/components/CheckoutWizard";
import { useSession } from "next-auth/react";

export default function PlaceOrder() {
	const router = useRouter();
	const { state, dispatch } = useContext(CartContext);
	const { cart } = state;
	const { shippingData, paymentMethod, cartItems } = cart;

	useEffect(() => {
		setHasMounted(true);
	}, []);

	const [hasMounted, setHasMounted] = useState(false);
	if (!hasMounted) return null; // Avoid rendering on server

	function getTomorrowFormatted() {
		const days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];
		const months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];

		const today = new Date();
		const tomorrow = new Date(today);
		tomorrow.setDate(today.getDate() + 1);

		const dayName = days[tomorrow.getDay()];
		const monthName = months[tomorrow.getMonth()];
		const dayOfMonth = tomorrow.getDate();

		return `${dayName}, ${monthName} ${dayOfMonth}`;
	}

	async function placeOrderHandler() {
		console.log("in the place order");
		console.log(cartItems);

		const totalPrice = cartItems.reduce(
			(a, item) => item.price * item.qty + a,
			0
		);

		const response = await fetch("/api/orders", {
			method: "POST",
			body: JSON.stringify({
				orderItems: cartItems,
				shippingData,
				paymentMethod,
				totalPrice,
			}),
			headers: {
				"Content-Type": "application/json",
				cookie: "req.headers.cookie" || "",
			},
			credentials: "include",
		});
		const data = await response.json();

		//remove the item from the cart
		for (let item of cartItems) {
			dispatch({ type: "REMOVE_ITEM", payload: item });
		}

		router.push("/order-completed");
	}
	return (
		<Layout title="Place order">
			{/* {shippingData && paymentMethod && cartItems && ( */}
			<div className="relative min-h-screen pb-50">
				<CheckoutWizard activeStep={3} />
				<h1 className="mb-4 text-xl"></h1>
				<div className="grid grid-cols-2 md:grid-cols-2 md:gap-10">
					<div className="flex flex-col">
						<div className="p-5 col-span-2 md:col-span-1 border-b border-gray-300">
							<div className="mb-10 flex items-center">
								<h2 className="font-semibold  text-lg">Shipping methods</h2>
								<FontAwesomeIcon className="text-2xl" icon={faCircleCheck} />
							</div>
							<div className="flex flex-wrap gap-10">
								<div className="mr-12">
									<div className="text-lg">{shippingData.deliveryOption}</div>
									<div className="text-sm">
										Tomorrow - {getTomorrowFormatted()}{" "}
									</div>
									<div className="text-sm"> €3.95 </div>
									<div className="text-sm mt-5">
										<Link
											className="text-sm text-gray-400 border-b border-gray-300"
											href="/shipping"
										>
											change shipping type{" "}
										</Link>
									</div>
								</div>
								<div>
									<div className="">
										<div className="text-lg">
											{shippingData.firstname} {shippingData.lastname}
										</div>
										<div className="text-sm">{shippingData.address}</div>
										<div className="text-sm">{shippingData.addressExtra}</div>
										<div className="text-sm">
											{shippingData.postalCode} {shippingData.city}
										</div>
										<div className="text-sm">{shippingData.city}</div>
										<div className="text-sm">SPAIN</div>
										<div className="text-sm">{shippingData.phone}</div>
										<div className="mt-5">
											<Link
												className="text-sm text-gray-400 border-b border-gray-300"
												href="/shipping"
											>
												change shipping address
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="p-5 col-span-2 md:col-span-1">
							<div className="mb-10 flex items-center">
								<h2 className="font-semibold  text-lg">Payment methods</h2>
								<FontAwesomeIcon className="text-2xl" icon={faCircleCheck} />
							</div>

							<div>{paymentMethod}</div>
							<div className="mt-5">
								<Link
									className="text-sm text-gray-400 border-b border-gray-300"
									href="/payment"
								>
									Change payment method
								</Link>
							</div>
						</div>
					</div>

					<div className="p-5 col-span-2 md:col-span-1">
						<div className="mb-10">
							<div className="flex justify-between">
								<div>
									<div className="mb-10 flex items-center">
										<h2 className="font-semibold  text-lg">Summary</h2>
										<FontAwesomeIcon
											className="text-2xl"
											icon={faCircleCheck}
										/>
									</div>
									<div className="text-xs">
										{cartItems.reduce((a, item) => item.qty + a, 0)}{" "}
										{cartItems.length === 1 ? "article" : "articles"}
									</div>
								</div>
								<div className="text-sm text-gray-400">
									<Link className="border-b border-gray-300" href="/">
										See more
									</Link>
								</div>
							</div>
						</div>

						<div className="flex flex-row gap-5 flex-wrap">
							{cartItems.map((item) => (
								<div
									key={item._id}
									className="flex  flex-col break-words w-[140px] gap-3"
								>
									<div className="">
										<Image
											alt={item.title}
											src={item.image[0]}
											width={120}
											height={170}
										/>
									</div>
									<div className="text-sm">{item.title}</div>
									<div className="text-sm">€{item.price}</div>
									<div className="text-sm">{item.qty}</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="fixed bottom-0 left-0 w-full py-10 bg-white border-t-10 border-gray-700 flex flex-col items-center justify-center">
					<h2 className="text-3xl flex gap-10 ">
						<span>
							Total{" "}
							<span className="text-gray-400 text-xl">
								({cartItems.reduce((a, item) => item.qty + a, 0)}{" "}
								{cartItems.length === 1 ? "article" : "articles"})
							</span>{" "}
						</span>
						<span>
							{cartItems.reduce((a, item) => item.price * item.qty + a, 0)} €
						</span>
					</h2>
					<div className="w-full px-4 flex justify-between">
						<button
							type="button"
							onClick={() => router.push("/payment")}
							className=" border border-black-500 px-8 py-2 cursor-pointer"
						>
							Return
						</button>
						<button
							onClick={placeOrderHandler}
							className="bg-gray-700 text-white border border-black-500 px-8 py-2 cursor-pointer"
						>
							Place order
						</button>
					</div>
				</div>
			</div>
		</Layout>
	);
}
