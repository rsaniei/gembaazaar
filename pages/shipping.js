import Cookies from "js-cookie";
import { useForm } from "react-hook-form";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { CartContext } from "@/context/Cart";
import Layout from "@/components/Layout";
import CheckoutWizard from "@/components/CheckoutWizard";

export default function Shipping() {
	const { state, dispatch } = useContext(CartContext);
	const router = useRouter();

	const { cart } = state;
	const { shippingData } = state;

	const { register, setValue, watch, handleSubmit } = useForm();
	const deliveryOption = watch("deliveryOption");

	useEffect(() => {
		setValue("deliveryOption", shippingData?.deliveryOption || "");
		if (shippingData?.deliveryOption === "Home delivery") {
			setValue("firstname", shippingData.firstname);
			setValue("lastname", shippingData.lastname);
			setValue("address", shippingData.address);
			setValue("addressExtra", shippingData.addressExtra);
			setValue("postalCode", shippingData.postalCode);
			setValue("city", shippingData.city);
		}
	}, [
		setValue,
		shippingData?.deliveryOption,
		shippingData?.firstname,
		shippingData?.lastname,
		shippingData?.address,
		shippingData?.addressExtra,
		shippingData?.postalCode,
		shippingData?.city,
	]);

	const shippingOptions = [
		{
			option: "In-store delivery",
			price: "FREE",
			description:
				"Some stores may be unavailable or offer different pickup dates.",
		},
		{
			option: "Delivery point",
			price: "2.95 €",
			description:
				"Delivery times may vary slightly depending on the collection point you choose.",
		},
		{ option: "Home delivery", price: "3.95 €", description: "" },
	];

	function submitHandler({
		deliveryOption,
		firstname,
		lastname,
		address,
		addressExtra,
		postalCode,
		city,
	}) {
		console.log(deliveryOption);
		console.log(firstname, lastname, address, addressExtra, postalCode, city);

		dispatch({
			type: "SAVE_SHIPPING_DATA",
			payload: {
				deliveryOption,
				firstname,
				lastname,
				address,
				addressExtra,
				postalCode,
				city,
			},
		});
		Cookies.set(
			"cart",
			JSON.stringify({
				...cart,
				shippingData: {
					deliveryOption,
					firstname,
					lastname,
					address,
					addressExtra,
					postalCode,
					city,
				},
			})
		);
		router.push("/payment");
	}
	return (
		<Layout title="Shipping">
			{/* active step is 1 (because step=0 is user login). here the user is already logged in */}
			<CheckoutWizard activeStep={1} />
			<form className="my-10" onSubmit={handleSubmit(submitHandler)}>
				{shippingOptions.map((item, index) => (
					<div key={index}>
						<label className="flex items-start gap-4 cursor-pointer">
							<input
								{...register("deliveryOption", { required: true })}
								type="radio"
								id="deliveryOption"
								value={item.option}
								className="mr-4 mt-2 scale-125"
							/>
							<div>
								<div>{item.option}</div>
								<div
									className={`${index === 0 ? "text-green-600" : "text-sm"}`}
								>
									{item.price}
								</div>
								<div className="text-xs"> {item.description}</div>
							</div>
						</label>
						<br />
					</div>
				))}

				{deliveryOption === "Home delivery" && (
					<div className="mb-10">
						<h2 className="mb-4">Personal data</h2>
						<div className="flex flex-wrap mb-10 gap-4">
							<input
								{...register("firstname", {
									required: true,
								})}
								type="text"
								id="firstname"
								placeholder="First name*"
								className="p-2 border-b-1  border-[#cccccc] w-100 focus:outline-none"
							/>
							<input
								{...register("lastname", {
									required: true,
								})}
								type="text"
								id="lastname"
								placeholder="Last name*"
								className="p-2 border-b-1  border-[#cccccc] w-100 focus:outline-none"
							/>
							<input
								{...register("phone", {
									required: false,
								})}
								type="phone"
								id="phone"
								placeholder="Phone number"
								className="p-2 border-b-1  border-[#cccccc] w-100 focus:outline-none"
							/>
						</div>

						<h2 className="mb-4">Delivery address</h2>
						<div className="mb-4 flex flex-wrap gap-4">
							<input
								{...register("address", {
									required: true,
								})}
								type="text"
								id="address"
								placeholder="Address*"
								className="p-2 border-b-1  border-[#cccccc] w-100 focus:outline-none"
							/>
							<input
								{...register("addressExtra", {
									required: false,
								})}
								type="text"
								id="addressExtra"
								placeholder="Other address information"
								className="p-2 border-b-1  border-[#cccccc] w-100 focus:outline-none"
							/>
							<input
								{...register("postalCode", {
									required: true,
								})}
								type="text"
								id="postalCode"
								placeholder="Postal code*"
								className="p-2 border-b-1  border-[#cccccc] w-100 focus:outline-none"
							/>
							<input
								{...register("city", {
									required: true,
								})}
								type="text"
								id="city"
								placeholder="City"
								className="p-2 border-b-1  border-[#cccccc] w-100 focus:outline-none"
							/>
						</div>
					</div>
				)}
				<button className="bg-gray-100 border border-black-500 px-8 py-2 cursor-pointer">
					Next
				</button>
			</form>
		</Layout>
	);
}
