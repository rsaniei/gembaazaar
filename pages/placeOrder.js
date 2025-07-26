import Link from "next/link";
import Layout from "@/components/Layout";
import CheckoutWizard from "@/components/CheckoutWizard";

export default function placeOrder() {
	return (
		<Layout title="Place order">
			<CheckoutWizard activeStep={3} />
			<h1 className="mb-4 text-xl">Place order</h1>
			<div className="grid md:grid-cols-4 md:gap-5">
				<div className="overflow-x-auto md:col-span-3">
					<div className="p-5">
						<h2 className="text-lg">Shipping data</h2>
						<div className="">Shipping data</div>
						<div>
							<Link href="/shipping">Edit</Link>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
