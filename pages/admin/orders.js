import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Orders() {
	const [adminOrders, setAdminOrders] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const response = await fetch("/api/admin/orders");
			const data = await response.json();
			setAdminOrders(data);
		}

		fetchData();
	}, []);

	return (
		<Layout title="Admin orders">
			<div className="grid md:grid-cols-4 md:gap-5">
				<div>
					<ul>
						<li className="p-2 m-2 bg-white rounded-md text-center font-bold">
							<Link href="/admin/dashboard">Dashboard</Link>
						</li>
						<li className="p-2 m-2 bg-white rounded-md text-center">
							<Link href="/admin/orders">Orders</Link>
						</li>
						<li className="p-2 m-2 bg-white rounded-md text-center">
							<Link href="/admin/products">Products</Link>
						</li>
						<li className="p-2 m-2 bg-white rounded-md text-center">
							<Link href="/admin/users">Users</Link>
						</li>
					</ul>
				</div>
				<div className="md:col-span-3">
					<h2 className="mb-4 text-xl">Admin orders</h2>
					{adminOrders.map((item, index) => (
						<div key={index} className="grid cols-4">
							<div className="bg-white p-2 m-2 rounded-md">
								<p className="text-lg">Price: {item.totalPrice}</p>
							</div>
							<div className="bg-white p-2 m-2 rounded-md">
								<p className="text-lg">Payment method: {item.paymentMethod}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
}
