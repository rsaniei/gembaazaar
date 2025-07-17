import Link from "next/link";

export default function DropDown({ href, children, ...rest }) {
	return (
		<Link {...rest} href={href}>
			{children}
		</Link>
	);
}
