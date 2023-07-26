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

export default function ProgressBar({
	title,
	level,
	current,
	max,
	suffix,
	icon,
	iconHover,
}: {
	title: string;
	level?: number;
	current: number;
	max: number;
	suffix: string;
	icon?: string;
	iconHover: {
		factionName: string;
		prestige: number;
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
	return (
		<div className="relative h-12 text-base">
			{(icon && iconHover && (
				<div className="relative w-12 h-12 bg-sky-500 icon-shadow rounded-full z-10">
					<div
						ref={refs.setReference}
						className="absolute top-4 left-4 w-4 h-4 scale-[2] z-10 pixelated"
						style={{ backgroundImage: `url('/images/${icon}')` }}
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
			)) ||
				(icon && (
					<div className="relative w-12 h-12 bg-sky-500 icon-shadow rounded-full z-10">
						<div
							className="absolute top-4 left-4 w-4 h-4 scale-[2] z-10 pixelated"
							style={{ backgroundImage: `url('/images/${icon}')` }}
						></div>
					</div>
				))}
			<div
				className={`absolute ${
					icon ? "left-14" : "left-7"
				} top-0 font-bold text-sm`}
			>
				{title}
				{level != undefined && (
					<span className="text-neutral-400"> {level}</span>
				)}
			</div>
			<div
				className={`absolute left-6 bottom-0 pl-4 right-0 h-6 bg-neutral-600 ${
					icon ? "rounded-r-md" : "rounded-md"
				}`}
			>
				<div
					className={`absolute left-0 top-0 bottom-0 bg-sky-500 ${
						icon ? "rounded-r-md" : "rounded-md"
					} text-center`}
					style={{ width: `calc((100% - 20px)*${(current / max).toFixed(4)})` }}
				></div>
				<div
					onMouseOver={() => setHover(true)}
					onMouseOut={() => setHover(false)}
					className="absolute left-5 right-0 top-0 bottom-0 text-center font-semibold text-sm"
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
