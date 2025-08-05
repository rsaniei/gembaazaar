import { toast } from "react-toastify";
import { useContext } from "react";
import Layout from "@/components/Layout";
import ProductItem from "@/components/ProductItem";
import db from "../utils/db";
import Product from "@/models/product";
import { CartContext } from "../context/Cart";
import Image from "next/image";

export default function Home({ products }) {
	const { state, dispatch } = useContext(CartContext);

	function addToCartHandler(product) {
		const existingItem = state.cart.cartItems.find(
			(item) => item.slug === product.slug
		);
		const qty = existingItem ? existingItem.qty + 1 : 1;

		if (qty > product.count) {
			toast.error("Product sold out!");
			return;
		}
		dispatch({ type: "ADD_ITEM", payload: { ...product, qty } });
		toast.success("Product added!");
	}
	return (
		<Layout title="HomePage">
			{/* set different grid counts for different medium size */}
			<div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[550px]">
				<Image
					src="/images/1.webp"
					alt="Hero Image"
					fill
					className="object-cover opacity-80"
					priority
				/>

				<div className="absolute inset-0 bg-black/30" />

				<div className="absolute inset-0 flex items-center justify-center">
					<h1 className="text-white text-3xl md:text-5xl font-bold text-center drop-shadow-lg mt-40">
						Discover Timeless Vintage Elegance
					</h1>
				</div>
			</div>
			<h2 className="p-5 mt-10 text-3xl">Featured products</h2>
			<div className="grid grid-cols-1 gap-2 md:grid-col-3 lg:grid-cols-4">
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
