import Layout from "@/components/Layout";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { CartContext } from "../../context/Cart.js";
import db from "../../utils/db";
import Product from "@/models/product";

export default function ProductPage({ product }) {
	const router = useRouter();
	const { state, dispatch } = useContext(CartContext);
	const [quantity, setQuantity] = useState(1);

	if (!product) return <div>product not found!</div>;

	function addToCartHandler() {
		const existingItem = state.cart.cartItems.find(
			(item) => item.slug === product.slug
		);

		const qty = existingItem ? existingItem.qty + quantity : quantity;

		if (qty > product.count) {
			alert(
				`Only ${product.count} item was added to your cart due to availability.!`
			);
			dispatch({
				type: "ADD_ITEM",
				payload: { ...product, qty: product.count },
			});
		} else {
			dispatch({ type: "ADD_ITEM", payload: { ...product, qty } });
			router.push("/cart");
		}
	}

	return (
		<Layout title={product.title}>
			<div className="grid  md:grid-cols-3 md:gap-3 bg-white p-10 ">
				<div className="md:col-span-2 flex flex-row gap-2 flex-wrap items-center justify-center ">
					{product.image.map((item) => (
						<Image
							key={item}
							src={item}
							alt={product.title}
							width={300}
							height={300}
							layout="intrinsic"
							// placeholder="blur"
							// blurDataURL="data:image/png;base64,..."
						></Image>
					))}
				</div>

				<div>
					<div className="flex flex-col ">
						<h2 className="mb-2 text-3xl font-bold">{product.title}</h2>
						<p className="mb-5 text-xs">{product.category}</p>
						<div className="mb-2">€{product.price} EUR</div>
						<div
							className={`mb-5 ${
								product.count > 0 ? "text-black" : "text-red-500"
							}`}
						>
							{product.count > 0 ? "Available" : "Unavailable"}
						</div>
						<div className="mb-5">
							Quantity
							<div className="flex justify-between bg-white border border-black text-black text-sm px-3 py-3 w-1/3 mt-2">
								<button
									className="cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed"
									disabled={product.count === 0}
									onClick={() => {
										if (quantity > 0) setQuantity(quantity - 1);
									}}
								>
									{" "}
									-{" "}
								</button>
								<div>{product.count > 0 ? quantity : 0}</div>
								<button
									className="cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed"
									disabled={product.count === 0}
									onClick={() => setQuantity(quantity + 1)}
								>
									{" "}
									+{" "}
								</button>
							</div>
						</div>

						<p className="text-s">{product.description}</p>
					</div>
					<button
						onClick={addToCartHandler}
						disabled={product.count === 0}
						className=" bg-white border border-black text-black text-sm  w-full px-3 py-3 mt-5 cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed"
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
