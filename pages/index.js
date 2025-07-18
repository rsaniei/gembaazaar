import Layout from "@/components/Layout";
import ProductItem from "@/components/ProductItem";
import db from "../utils/db";
import Product from "@/models/product";
import { useContext } from "react";
import { CartContext } from "../context/Cart";

export default function Home({ products }) {
	const { state, dispatch } = useContext(CartContext);

	function addToCartHandler(product) {
		const existingItem = state.cart.cartItems.find(
			(item) => item.slug === product.slug
		);
		const qty = existingItem ? existingItem.qty + 1 : 1;

		if (qty > product.count) {
			alert("Product is Out!");
			return;
		}
		dispatch({ type: "ADD_ITEM", payload: { ...product, qty } });
	}
	return (
		<Layout title="HomePage">
			{/* set different grid counts for different medium size */}
			<div className="grid grid-cols-1 gap-6 md:grid-col-3 lg:grid-cols-4">
				{products.map((p) => (
					<ProductItem
						key={p.title}
						item={p}
						addtoCard={(p) => addToCartHandler(p)}
					/>
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
