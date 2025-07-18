import Layout from "@/components/Layout";
import Image from "next/image";
import { useRouter } from "next/router";
import productItems from "../../data/products.js";
import { useContext } from "react";
import { CartContext } from "../../context/Cart.js";

export default function ProductPage() {
	const { query } = useRouter();
	const router = useRouter();
	//we named the file as [slug].js
	const { slug } = query;

	//useContext
	// value ={state, dispatch}
	const { state, dispatch } = useContext(CartContext);

	//find the product we want to show its page based on the url query
	const pitem = productItems.find((item) => item.slug === slug);

	if (!pitem) return <div>product not found!</div>;

	function addToCartHandler() {
		const existingItem = state.cart.cartItems.find(
			(item) => item.slug === pitem.slug
		);

		const qty = existingItem ? existingItem.qty + 1 : 1;
		if (qty > pitem.count) {
			alert("Product is out!");
			return;
		}
		dispatch({ type: "ADD_ITEM", payload: { ...pitem, qty } });
		router.push("/cart");
	}
	return (
		<Layout title={pitem.title}>
			<div className="grid  md:grid-cols-4 md:gap-3 rounded-xl bg-white p-10">
				{/* **col-span-2**: Used to control how many columns an element should span in a CSS grid layout. */}
				{/*  here span 2 columns  the image on medium screens and up : className="md:col-span-2"*/}
				<div className="md:col-span-2">
					<Image
						className="rounded-xl"
						src={pitem.image}
						alt={pitem.title}
						width={340}
						height={340}
						// The image will scale automatically with the width of its container, maintaining its original aspect ratio.
						layout="responsive"
					></Image>
				</div>
				<div>
					<div className="flex flex-col ">
						<h2 className="mb-2 text-lg font-bold">{pitem.title}</h2>
						<p className="mb-5 text-sm">{pitem.category}</p>
						<p className="text-base">{pitem.description}</p>
					</div>
				</div>
				<div className="p-5">
					<div className="flex mb-2 justify-between">
						<div>Price: </div>
						<div>{pitem.price}</div>
					</div>
					<div className="flex mb-2 justify-between">
						<div>Availability:</div>
						<div>{pitem.count > 0 ? "Available" : "Unavailable"}</div>
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
