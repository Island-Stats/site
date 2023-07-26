"use client";
import Link from "next/link";

export default function About() {
	return (
		<div>
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
					Want to help contribute? Check out the github repo{" "}
					<Link href={"https://github.com/Island-Stats/site"}>here</Link>.
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
		</div>
	);
}
