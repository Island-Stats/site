	"use client";
	import {
		FloatingArrow,
		arrow,
		autoUpdate,
		offset,
		useFloating,
		useHover,
	} from "@floating-ui/react";
	import { useRef, useState } from "react";

	export default function FactionBar({
		level,
		current,
		max,
		faction,
		factionName,
		prestige,
	}: {
		level: number;
		current: number;
		max: number;
		faction: string;
		factionName: string;
		prestige: number;
	}) {
		const [isOpen, setIsOpen] = useState(false);
		const arrowRef = useRef(null);
		const { refs, floatingStyles, context } = useFloating({
			open: isOpen,
			onOpenChange: setIsOpen,
			middleware: [
				offset(15),
				arrow({
					element: arrowRef,
				}),
			],
			whileElementsMounted: autoUpdate,
		});
		useHover(context);

		const [hover, setHover] = useState(false);

		return (
			<div className="relative h-12 text-base">
				<div
					className="relative w-12 h-12 faction-colors icon-shadow rounded-full z-10"
					style={{ backgroundColor: `var(--${faction})` }}
				>
					<div
						ref={refs.setReference}
						className="absolute top-4 left-3 w-6 h-4 scale-[1.75] pixelated"
						style={{
							backgroundImage: `url('/images/factions/${faction}/${prestige}.png')`,
							backgroundRepeat: "no-repeat",
						}}
					></div>
				</div>
				<div className="absolute left-14 top-0 font-bold text-sm">
					Faction Level
					<span className="text-neutral-300"> {level}</span>
				</div>
				<div
					className="absolute left-6 bottom-0 pl-4 right-0 h-6 rounded-r-md faction-colors mcc-colors"
					style={{
						backgroundColor: `var(--${faction}-dark)`,
					}}
				>
					<div
						className="absolute left-0 top-0 bottom-0 rounded-r-md text-center"
						style={{
							width: `calc((100% - 20px)*${(current / max).toFixed(4)})`,
							backgroundColor: `var(--${faction})`,
						}}
					></div>
					<div
						onMouseOver={() => setHover(true)}
						onMouseOut={() => setHover(false)}
						className={`absolute left-5 right-0 top-0 bottom-0 text-center font-bold text-sm text-black`}
					>
						{hover
							? `${current.toLocaleString()} / ${max.toLocaleString()}`
							: `${
									// Shorten numbers to thousands if greater than 1,000 (10k) or millions if greater than 1,000,000 (10m)
									current >= 1000000
										? `${(current / 1000000).toFixed(1)}M`
										: current >= 1000
										? `${(current / 1000).toFixed(0)}K`
										: current
							} / ${
									// Shorten numbers to thousands if greater than 1,000 (10k) or millions if greater than 1,000,000 (10m)
									max >= 1000000
										? `${(max / 1000000).toFixed(1)}M`
										: max >= 1000
										? `${(max / 1000).toFixed(0)}K`
										: max
							}`}{" "}
						XP
					</div>
				</div>
				{isOpen && (
					<div ref={refs.setFloating} style={floatingStyles} className="z-20">
						<div className="bg-neutral-800 p-2 rounded-md text-center whitespace-nowrap">
							<p>{factionName}</p>
							<p>Prestige: {prestige}</p>
						</div>
						<FloatingArrow
							ref={arrowRef}
							context={context}
							className="fill-sky-500"
						/>
					</div>
				)}
			</div>
		);
	}
