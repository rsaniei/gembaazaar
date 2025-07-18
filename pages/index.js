import Layout from "@/components/Layout";
import ProductItem from "@/components/ProductItem";
import db from "../utils/db";
import Product from "@/models/product";
export default function Home({ products }) {
	return (
		<Layout title="HomePage">
			{/* set different grid counts for different medium size */}
			<div className="grid grid-cols-1 gap-6 md:grid-col-3 lg:grid-cols-4">
				{products.map((p) => (
					<ProductItem key={p.title} item={p} />
				))}
			</div>
		</Layout>
	);
}

//get the data from NextJS
//this will be run BEFORE rendering the component on each client request (each browser request)
export async function getServerSideProps() {
	await db.connect();
	const products = await Product.find().lean();
	// const serializedProducts = products.map(convertToObject);

	return {
		props: {
			products: products.map(db.convertToObject),
		},
	};
}
