import Layout from "@/components/Layout";
import Link from "next/link";

export default function OrderCompletedPage() {
	return (
		<Layout title="Order Completed">
			<h2>Thanks for your purchase!</h2>
			<Link href="order-history"> View orders history</Link>
		</Layout>
	);
}
