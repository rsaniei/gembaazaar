import Layout from "@/components/Layout";
import Link from "next/link";

import { useEffect, useState } from "react";

DashboardPage.auth = { adminOnly: true };

export default function DashboardPage() {
	const [adminData, setAdminData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch("/api/admin/summary");
			const data = await response.json();
			setAdminData(data);
		}

		fetchData();
	}, []);

	return (
		<Layout title="Admin Dashboard">
			<div className="grid grid-cols-4 gap-5">
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
				<div className="md: col-span-3">
					<h2 className="mb-4text-xl">Admin dashboard</h2>
					<div>
						{adminData.map((item, index) => (
							<div key={index} className="flex p-2">
								<div className="m-5 p-5 bg-white rounded-xl text-center">
									<p>orders</p>
									<p className="text-3xl">{item.ordersCount}</p>
								</div>
								<div className="m-5 p-5 bg-white rounded-xl text-center">
									<p>products</p>
									<p className="text-3xl">{item.productsCount}</p>
								</div>
								<div className="m-5 p-5 bg-white rounded-xl text-center">
									<p>users</p>
									<p className="text-3xl">{item.usersCount}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
}
