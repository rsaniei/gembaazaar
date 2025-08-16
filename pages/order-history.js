import Layout from "@/components/Layout";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function OrderHistoryPage() {
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		async function fetchOrders() {
			const response = await fetch("/api/orders/history");
			const data = await response.json();
			console.log(data);

			setOrders(data);
		}
		fetchOrders();
	}, []);

	return (
		<Layout title="Order history">
			<h2>Order history</h2>
			<div className="flex flex-col gap-5">
				{orders?.map((order) => (
					<div
						key={order._id}
						className="flex-col gap-3 border-b-1 border-gray-300 last:border-b-0"
					>
						{order.orderItems.map((item) => (
							<div key={item._id} className="flex gap-2 mb-2">
								<Image
									key={item}
									src={item.image[0]}
									alt={item.title}
									width={100}
									height={100}
									layout="intrinsic"
								></Image>
								<div>
									<div>{item.title}</div>
									<div> Quantity: {item.qty}</div>
									<div> €{item.price}</div>
								</div>
							</div>
						))}
						<div className="flex">
							<div className="ml-auto">Total price: €{order.totalPrice}</div>
						</div>
					</div>
				))}
			</div>
		</Layout>
	);
}
