import Layout from "@/components/Layout";
import Link from "next/link";

DashboardPage.auth = { adminOnly: true };
export default function DashboardPage() {
	return (
		<Layout title="Admin Dashboard">
			<h2>Dashboard page</h2>
			<div className="grid grid-cols-4 gap-5">
				<div>
					<ul>
						<li>
							<Link href="/admin/dashboard">Dashboard</Link>
						</li>
						<li>
							<Link href="/admin/orders">Orders</Link>
						</li>
						<li>
							<Link href="/admin/products">Products</Link>
						</li>
						<li>
							<Link href="/admin/users">Users</Link>
						</li>
					</ul>
				</div>
			</div>
		</Layout>
	);
}
