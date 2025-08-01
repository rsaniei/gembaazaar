import Layout from "@/components/Layout";
import { useEffect, useState } from "react";

export default function OrderHistoryPage() {
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		async function fetchOrders() {
			const response = await fetch("/api/orders/history");
			const data = await response.json();

			setOrders(data);
		}
		fetchOrders();
	}, []);

	return (
		<Layout title="Order history">
			<h2>Order history</h2>
			<div>
				{orders.map((order) => (
					<div key={order._id}>
						<div>{order._id}</div>
						<div> {order.totalPrice}</div>
					</div>
				))}
			</div>
		</Layout>
	);
}
