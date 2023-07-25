"use client";
import Link from "next/link";
import PlayerCount from "../minor/player-count";
import Image from "next/image";

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
			<button
				className="expander ml-4"
				aria-expanded={false}
				id="info-button"
				onClick={(event) => {
					const button = event.currentTarget;
					const expanded =
						button.getAttribute("aria-expanded") == "true";
					button.setAttribute("aria-expanded", String(!expanded));
				}}
			>
				About
			</button>
			<div id="info-box" className="expandable text-base space-y-5">
				<p>
					Island Stats is a free open source stats viewer for MCC
					Island.
				</p>
				<p>
					Powered by the MCC Island API, you can check the stats of
					yourself, your friends or anyone in between.
				</p>
				<p>
					Design inspired by{" "}
					<Link href={"https://sky.shiiyu.moe/"}>SkyCrypt</Link>.
				</p>
				<p>
					Island Stats is not affiliated with{" "}
					<Link href={"https://noxcrew.com/"} target="_blank">
						Noxcrew
					</Link>{" "}
					or{" "}
					<Link href={"https://mcchampionship.com/"}>MCC Island</Link>
					.
				</p>
			</div>
			<PlayerCount />
		</header>
	);
}
