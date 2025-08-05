import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "../context/Cart.js";

export default function CartItem({ item }) {
	const { state, dispatch } = useContext(CartContext);

	function removeItemHandler(item) {
		dispatch({ type: "REMOVE_ITEM", payload: item });
	}
	return (
		<div className="bg-white flex flex-col md:flex-row gap-10 p-10">
			<Image
				src={item.image[0]}
				alt={item.title}
				width={140}
				height={140}
			></Image>
			<div className="flex flex-col col-span-2">
				<h2 className="text-md">{item.title}</h2>
				<div>{item.price}</div>
				<div>{item.qty}</div>
				<div>
					<button
						className="bg-white border border-black text-black text-sm  w-40 px-3 py-3 mt-5 cursor-pointer"
						onClick={() => removeItemHandler(item)}
					>
						Remove
					</button>
				</div>
			</div>
		</div>
	);
}
