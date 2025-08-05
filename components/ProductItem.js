import Link from "next/link";
import Image from "next/image";
export default function ProductItem({ item, addtoCard }) {
	return (
		<div className=" block py-5">
			<Link href={`/product/${item.slug}`}>
				<Image
					alt={item.title}
					src={item.image[0]}
					width={220}
					height={430}
					className="mb-5 w-full"
				/>
			</Link>
			<div className="relative flex flex-col justify-right justify-center">
				<Link href={`/product/${item.slug}`}>
					<h2 className="text-sm">{item.title}</h2>
				</Link>
				<p className="p-2">€{item.price} EUR</p>

				<button
					className="bg-white border border-black text-black absolute bottom-0 right-2 w-fit px-3 py-1 mt-2 cursor-pointer"
					onClick={() => addtoCard(item)}
				>
					+
				</button>
			</div>
		</div>
	);
}
