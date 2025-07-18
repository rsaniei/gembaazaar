import Layout from "@/components/Layout";
import Product from "@/components/Product";
import productItems from "../data/products.js";

export default function Home() {
	return (
		<Layout title="HomePage">
			{/* set different grid counts for different medium size */}
			<div className="grid grid-cols-1 gap-6 md:grid-col-3 lg:grid-cols-4">
				{productItems.map((p) => (
					<Product key={p.title} item={p} />
				))}
			</div>
		</Layout>
	);
}

// export async function getStaticProps(params) {
// 	const filePath = path.join(process.cwd(), "data", "products.json");
// 	const jsonData = fs.readFileSync(filePath, "utf-8");
// 	const data = JSON.parse(jsonData);
// 	console.log(data);
// 	return {
// 		props: {
// 			products: data,
// 		},
// 	};
// }
