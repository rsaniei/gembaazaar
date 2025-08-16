import Layout from "@/components/Layout";
import { useEffect, useState } from "react";

export default function OrderHistoryPage() {
	const [orders, setOrders] = useState([]);
	const [totalPrice, setTotalPrice] = useState(null);
	useEffect(() => {
		async function fetchOrders() {
			const response = await fetch("/api/orders/history");
			const data = await response.json();
			console.log(data);

			setOrders(data[0].orderItems);
			setTotalPrice(data[0].totalPrice);
		}
		fetchOrders();
	}, []);

	return (
		<Layout title="Order history">
			<h2>Order history</h2>
			<div>
				{orders?.map((order) => (
					<div key={order._id}>
						<div>{order.title}</div>
						<div> {order.qty}</div>
						<div> {order.price}</div>
					</div>
				))}
			</div>
		</Layout>
	);
}
