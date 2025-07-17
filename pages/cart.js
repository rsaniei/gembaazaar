import { useContext } from "react";
import { CartContext } from "../context/Cart.js";
import dynamic from "next/dynamic.js";
import Layout from "@/components/Layout.js";
import CartItem from "@/components/CartItem.js";
import { useRouter } from "next/router.js";

function CartPage() {
	const { state, dispatch } = useContext(CartContext);
	const router = useRouter();
	const {
		cart: { cartItems },
	} = state;

	function checkoutHandler() {
		router.push("login?redirect=/checkout"); //check later
	}
	return (
		<Layout title="Shopping Cart">
			<h1 className="text-xl mb-4">Shopping Cart</h1>
			<div className="flex flex-row  gap-10">
				{cartItems.length === 0 ? (
					<div className="flex-[3]">Cart is empty</div>
				) : (
					<div className="flex flex-col flex-[3]  md:gap-5">
						{cartItems.map((item) => (
							<CartItem key={item.slug} item={item} />
						))}
					</div>
				)}
				<div className="flex-[1] p-5">
					<div>
						Total Price:{" "}
						{cartItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0)}
					</div>
					<button
						className="rounded-xl bg-gray-700 text-white py-2 px-4"
						onClick={checkoutHandler}
					>
						Checkout
					</button>
				</div>
			</div>
		</Layout>
	);
}

//dynamic helps us to render a component in the client side -and not server side-
export default dynamic(() => Promise.resolve(CartPage), { ssr: false });
