"use client";
import {
	FloatingArrow,
	arrow,
	autoUpdate,
	offset,
	useFloating,
	useHover,
} from "@floating-ui/react";
import { ReactElement, useRef, useState } from "react";

export default function FactionProgress({
	title,
	level,
	current,
	max,
	suffix,
	faction,
	iconHover,
}: {
	title: string;
	level?: number;
	current: number;
	max: number;
	suffix: string;
	faction?: string;
	iconHover: {
		factionName?: string;
		prestige?: number;
	};
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

	// Testing
	current = 90_000;
	let lightColor = false;

	switch (faction) {
		case "aqua":
		case "lime":
		case "yellow":
			lightColor = true;
			break;
	}

	return (
		<div className="relative h-12 text-base">
			<div
				className="relative w-12 h-12 faction-colors icon-shadow rounded-full z-10"
				style={{ backgroundColor: `var(--${faction})` }}
			>
				<div
					ref={refs.setReference}
					className="absolute top-4 left-4 w-4 h-4 scale-[2] z-10 pixelated"
					style={{ backgroundImage: `url('/images/factions/${faction}.png')` }}
				></div>
				{isOpen && (
					<div ref={refs.setFloating} style={floatingStyles}>
						<div className="bg-neutral-800 p-2 rounded-md text-center whitespace-nowrap">
							<p>{iconHover.factionName}</p>
							<p>Prestige: {iconHover.prestige}</p>
						</div>
						<FloatingArrow
							ref={arrowRef}
							context={context}
							className="fill-sky-500"
						/>
					</div>
				)}
			</div>
			<div className="absolute left-14 top-0 font-bold text-sm">
				{title}
				{level != undefined && (
					<span className="text-neutral-400"> {level}</span>
				)}
			</div>
			<div className="absolute left-6 bottom-0 pl-4 right-0 h-6 bg-neutral-600 rounded-r-md ">
				<div
					className="absolute left-0 top-0 bottom-0 faction-colors rounded-r-md text-center"
					style={{
						width: `calc((100% - 20px)*${(current / max).toFixed(4)})`,
						backgroundColor: `var(--${faction})`,
					}}
				></div>
				<div
					onMouseOver={() => setHover(true)}
					onMouseOut={() => setHover(false)}
					className={`absolute left-5 right-0 top-0 bottom-0 text-center font-semibold text-sm ${
						lightColor ? "text-black" : "text-white"
					}`}
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
					{suffix}
				</div>
			</div>
		</div>
	);
}
