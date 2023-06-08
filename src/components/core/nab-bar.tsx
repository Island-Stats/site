"use client";
import Link from "next/link";

export default function NavBar() {
	return (
		<header className="fixed top-0 left-0 right-0 h-12 bg-neutral-800 flex flex-row items-center z-50">
			<Link href="/" className="mx-2 font-semibold">
				Island Stats
			</Link>
			<button className="expander" aria-expanded={false} id="info-button">
				About
			</button>
			<div id="info-box" className="expandable">
				<p>Island Stats is a website to display </p>
			</div>
		</header>
	);
}
