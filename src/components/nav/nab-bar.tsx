import Link from "next/link";
import PlayerCount from "./player-count";
import Image from "next/image";
import About from "./about";

export default function NavBar() {
	return (
		<header className="fixed top-0 left-0 right-0 h-12 bg-neutral-800 flex flex-row items-center z-50 text-lg">
			<Link href="/" className="flex items-center ml-4 font-semibold">
				<Image
					src="/images/icons/logo.png"
					alt="Island Stats Logo"
					width={32}
					height={32}
					className="mr-0.5"
				/>
				Island Stats
			</Link>
			<About />
			<PlayerCount />
		</header>
	);
}
