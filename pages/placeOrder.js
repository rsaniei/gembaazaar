import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "@/context/Cart";
import Layout from "@/components/Layout";
import CheckoutWizard from "@/components/CheckoutWizard";

export default function PlaceOrder() {
	const { state, dispatch } = useContext(CartContext);
	const { cart } = state;
	const { shippingData, paymentMethod, cartItems } = cart;
	console.log(shippingData);

	return (
		<Layout title="Place order">
			<CheckoutWizard activeStep={3} />
			<h1 className="mb-4 text-xl">Place order</h1>
			<div className="grid grid-cols-2 md:grid-cols-2 md:gap-5">
				<div className="p-5 col-span-2 md:col-span-1">
					<h2 className="mb-2 text-lg">Shipping methods</h2>
					<div className="flex flex-wrap gap-15">
						<div className="">{shippingData.deliveryOption}</div>
						<div>
							<div>
								{shippingData.firstname} {shippingData.lastname}
								<div className="">{shippingData.address}</div>
								<div className="">{shippingData.addressExtra}</div>
								<div className="">
									{shippingData.postalCode} {shippingData.city}
								</div>
								<div className="">{shippingData.city}</div>
								<div className="">SPAIN</div>
								<div className="">{shippingData.phone}</div>
							</div>
						</div>
					</div>

					<div>
						<Link href="/shipping">Edit</Link>
					</div>
				</div>
				<div className="p-5 col-span-2 md:col-span-1">
					<h2 className="mb-2 text-lg">Summary</h2>
					<div>
						{cartItems.map((item) => (
							<div key={item._id} className="flex flex-wrap gap-3">
								<div className="">
									<Image
										alt={item.title}
										src={item.image}
										width={120}
										height={170}
									/>
								</div>
								<div>{item.title}</div>
								<div>{item.count}</div>
							</div>
						))}
					</div>
				</div>
				<div className="p-5 col-span-2 md:col-span-1">
					<h2 className="mb-2 text-lg">Payment Method</h2>
					<div>{paymentMethod}</div>
					<div>
						<Link href="/payment">Edit</Link>
					</div>
				</div>
			</div>
		</Layout>
	);
}
