import Layout from "@/components/Layout";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { CartContext } from "../../context/Cart.js";
import db from "../../utils/db";
import Product from "@/models/product";

export default function ProductPage({ product }) {
	const router = useRouter();
	const { state, dispatch } = useContext(CartContext);

	if (!product) return <div>product not found!</div>;

	function addToCartHandler() {
		const existingItem = state.cart.cartItems.find(
			(item) => item.slug === product.slug
		);

		const qty = existingItem ? existingItem.qty + 1 : 1;
		if (qty > product.count) {
			alert("Product is out!");
			return;
		}
		dispatch({ type: "ADD_ITEM", payload: { ...product, qty } });
		router.push("/cart");
	}

	return (
		<Layout title={product.title}>
			<div className="grid  md:grid-cols-4 md:gap-3 rounded-xl bg-white p-10">
				{/* **col-span-2**: Used to control how many columns an element should span in a CSS grid layout. */}
				{/*  here span 2 columns  the image on medium screens and up : className="md:col-span-2"*/}
				<div className="md:col-span-2">
					<Image
						className="rounded-xl"
						src={product.image}
						alt={product.title}
						width={340}
						height={340}
						// The image will scale automatically with the width of its container, maintaining its original aspect ratio.
						layout="responsive"
					></Image>
				</div>
				<div>
					<div className="flex flex-col ">
						<h2 className="mb-2 text-lg font-bold">{product.title}</h2>
						<p className="mb-5 text-sm">{product.category}</p>
						<p className="text-base">{product.description}</p>
					</div>
				</div>
				<div className="p-5">
					<div className="flex mb-2 justify-between">
						<div>Price: </div>
						<div>{product.price}</div>
					</div>
					<div className="flex mb-2 justify-between">
						<div>Availability:</div>
						<div>{product.count > 0 ? "Available" : "Unavailable"}</div>
					</div>
					<button
						onClick={addToCartHandler}
						className="rounded-xl bg-blue-700 text-white px-5 py-2 w-full"
					>
						{" "}
						Add To Cart
					</button>
				</div>
			</div>
		</Layout>
	);
}

// i think we should add it here and get the data from the backend
// function getStaticPaths() {}
export async function getServerSideProps(context) {
	const { params } = context;
	const { slug } = params;

	await db.connect();
	const product = await Product.findOne({ slug }).lean();

	return {
		props: {
			product: product ? db.convertToObject(product) : null,
		},
	};
}
