import { useState } from "react";
import Layout from "@/components/Layout";
import CheckoutWizard from "@/components/CheckoutWizard";

export default function Shipping() {
	const [selectedOption, setSelectedOption] = useState(null);
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

	function handleSubmit() {}
	return (
		<Layout title="Shipping">
			{/* active step is 1 (because step=0 is user login). here the user is already logged in */}
			<CheckoutWizard activeStep={1} />
			<form className="my-10" onSubmit={handleSubmit}>
				{shippingOptions.map((item, index) => (
					<>
						<label className="flex items-start gap-4 cursor-pointer">
							<input
								type="radio"
								name="address"
								value={item.option}
								className="mr-4 mt-2 scale-125"
								onChange={(e) => {
									setSelectedOption(e.target.value);
								}}
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
					</>
				))}

				{selectedOption === "Home delivery" && (
					<div className="mb-10">
						<h2 className="mb-4">Personal data</h2>
						<div className="flex flex-wrap mb-10 gap-4">
							<input
								type="text"
								id="firstname"
								placeholder="First name*"
								className="p-2 border-b-1  border-[#cccccc] w-100 focus:outline-none"
							/>
							<input
								type="text"
								id="lastname"
								placeholder="Last name*"
								className="p-2 border-b-1  border-[#cccccc] w-100 focus:outline-none"
							/>
							<input
								type="phone"
								id="phone"
								placeholder="Phone number"
								className="p-2 border-b-1  border-[#cccccc] w-100 focus:outline-none"
							/>
						</div>

						<h2 className="mb-4">Delivery address</h2>
						<div className="mb-4 flex flex-wrap gap-4">
							<input
								type="text"
								id="address"
								placeholder="Address*"
								className="p-2 border-b-1  border-[#cccccc] w-100 focus:outline-none"
							/>
							<input
								type="text"
								id="address-extra"
								placeholder="Other address information"
								className="p-2 border-b-1  border-[#cccccc] w-100 focus:outline-none"
							/>
							<input
								type="text"
								id="postalcode"
								placeholder="Postal code*"
								className="p-2 border-b-1  border-[#cccccc] w-100 focus:outline-none"
							/>
							<input
								type="text"
								id="city"
								placeholder="City"
								className="p-2 border-b-1  border-[#cccccc] w-100 focus:outline-none"
							/>
						</div>
					</div>
				)}
				<butt className="bg-gray-100 border border-black-500 px-8 py-2 cursor-pointer">
					Next
				</butt>
			</form>
		</Layout>
	);
}
