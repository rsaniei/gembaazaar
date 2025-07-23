import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import Layout from "@/components/Layout";
import CheckoutWizard from "@/components/CheckoutWizard";
import { CartContext } from "@/context/Cart";

export default function PaymentPage() {
	const { state, dispatch } = useContext(CartContext);
	const { cart } = state;
	const { paymentMethod } = cart;
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
		paymentMethod || ""
	);
	console.log(selectedPaymentMethod);

	const router = useRouter();

	const methods = ["Gateway", "Offline Payment"];

	function submitHandler(event) {
		event.preventDefault();
		if (!selectedPaymentMethod) alert("Please select a payment method");
		dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
		Cookies.set(
			"cart",
			JSON.stringify({ ...cart, paymentMethod: selectedPaymentMethod })
		);
		router.push("/placeOrder");
	}
	return (
		<Layout title="Payment Page">
			<CheckoutWizard activeStep={2} />
			<form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
				<h2 className="mb-4 text-xl">Payment Method:</h2>
				{methods.map((item) => (
					<div key={item} className="mb-4">
						<input
							type="radio"
							name="paymentMethod"
							className="p-2"
							id={item}
							checked={selectedPaymentMethod === item}
							onChange={() => setSelectedPaymentMethod(item)}
						/>
						<label className="p-2" htmlFor={item}>
							{item}
						</label>
					</div>
				))}
				<div className="flex mb-4 justify-between">
					<button
						type="button"
						onClick={() => router.push("/shipping")}
						className="bg-gray-100 border border-black-500 px-8 py-2 cursor-pointer"
					>
						Back
					</button>
					<button className="bg-gray-700 text-white border border-black-500 px-8 py-2 cursor-pointer">
						Next
					</button>
				</div>
			</form>
		</Layout>
	);
}
