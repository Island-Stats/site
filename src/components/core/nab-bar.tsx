import Link from "next/link";

export default function NavBar() {
	return (
		<header className="absolute top-0 left-0 right-0 h-12 bg-neutral-800 flex flex-row items-center z-50">
			<Link href="/" className="mx-2 font-semibold">
				Island Stats
			</Link>
		</header>
	);
}
