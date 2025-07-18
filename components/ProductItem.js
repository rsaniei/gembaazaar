import Link from "next/link";
import Image from "next/image";
export default function ProductItem({ item }) {
	return (
		<div className=" bg-white rounded-xl mb-5 block py-5">
			<Link href={`/product/${item.slug}`}>
				{/* <Image alt={item.title} src={item.image} className="rounded-t-xl" /> */}
			</Link>
			<div className="flex flex-col items-center justify-center">
				<Link href={`/product/${item.slug}`}>
					<h2 className="text-lg">{item.title}</h2>
				</Link>
				<p className="p-2">{item.price}</p>
				<button className="rounded-xl bg-gray-700 text-white px-4 py-2">
					Add to Cart
				</button>
			</div>
		</div>
	);
}
