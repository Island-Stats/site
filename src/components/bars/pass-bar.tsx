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

const passNames: { [key: string]: string } = {
	// Battle Pass
	basic: "Basic Road",
	premium: "Premium Road",
	ultimate: "Ultimate Road",
	// Battle Box
	raiders: "Raiders Game Pass",
	knights: "Knights Game Pass",
	// Hole in the Wall
	slimy_experiments: "Slimy Experiments Game Pass",
	wall_king: "Wall King Game Pass",
	// SKy Battle
	sky_lord: "Sky Lord Game Pass",
	storm_lord: "Storm Lord Game Pass",
	// TGTTOS
	eggcellent: "Eggcellent Game Pass",
	roadworks: "Roadworks Game Pass",
	// Parkour Warrior
	master_frog: "Master Frog Game Pass",
	cherry_blossom: "Cherry Blossom Game Pass",
};

export default function PassBar({
	level, // Current level
	current, // Current XP
	max, // Max XP

	passType, // Game name or Battle Pass
	type, // Type of pass
	premium, // Boolean for if the pass is premium or not
}: {
	level: number;
	current: number;
	max: number;
	color: string;
	passType: string;
	type: string;
	premium: boolean;
}) {
	// Tooltip
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

	// XP Hover state
	const [hover, setHover] = useState(false);

	// Pass info
	const [passOpen, setPassOpen] = useState(false);

	const color = () => {
		switch (passType) {
			case "battle_pass": {
				if (type == "basic") return "rare";
				if (type == "premium") return "epic";
				if (type == "ultimate") return "mythic";
				else return "rare";
			}
			default: {
				if (premium) return "legendary";
				else return "rare";
			}
		}
	};

	return (
		<>
			<div
				className="relative overflow-clip transition-height duration-700 h-12 aria-selected:h-40"
				aria-selected={passOpen}
			>
				<div
					className="relative w-12 h-12 mcc-colors icon-shadow rounded-full z-10"
					style={{ backgroundColor: `var(--${color()})` }}
				>
					<div
						ref={refs.setReference}
						className="absolute top-4 left-4 w-4 h-4 scale-[2] pixelated"
						style={{
							backgroundImage: `url('/images/passes/${passType}/${type}.png')`,
							backgroundRepeat: "no-repeat",
						}}
					></div>
				</div>
				<div className="absolute left-14 top-0 font-bold text-sm">
					Level
					<span className="text-neutral-300"> {level}</span>
				</div>

				<div
					className="absolute left-6 top-6 pl-4 right-0 h-6 rounded-r-md mcc-colors"
					style={{
						backgroundColor: `var(--${color()}-dark)`,
						//filter: "brightness(0.6)"
					}}
					onClick={() => setPassOpen(!passOpen)}
				>
					<div
						className="absolute left-0 top-0 bottom-0 rounded-r-md text-center"
						style={{
							width: `calc((100% - 20px)*${(current / max).toFixed(4)})`,
							backgroundColor: `var(--${color()})`,
						}}
					></div>
					<div
						onMouseOver={() => setHover(true)}
						onMouseOut={() => setHover(false)}
						className={`relative left-5 right-0 top-0 bottom-0 text-center font-bold text-sm text-white`}
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
					<div className="mt-1 bg-neutral-700 bg-opacity-70 rounded-b-md rounded-tr-md p-2 text-white font-semibold">
						<p>Pass Task 1: 5/10</p>
						<p>Pass Task 2: 55/275</p>
						<p>Pass Task 3: 5/100</p>
						<p>Mastery Task: 5/75</p>
					</div>
				</div>
			</div>
			{isOpen && (
				<div ref={refs.setFloating} style={floatingStyles} className="z-20">
					<div className="bg-neutral-800 p-2 rounded-md text-center whitespace-nowrap">
						<p>{passNames[type]}</p>
						<p>Premium: {premium ? "True" : "False"}</p>
					</div>
					<FloatingArrow
						ref={arrowRef}
						context={context}
						className="fill-sky-500"
					/>
				</div>
			)}
		</>
	);
}
