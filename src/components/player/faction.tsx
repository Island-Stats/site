"use client";
import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const factions = [
	"red",
	"orange",
	"yellow",
	"lime",
	"green",
	"cyan",
	"aqua",
	"blue",
	"purple",
	"pink",
];

function Number({ n }: { n: number }) {
	const { number } = useSpring({
		number: n,
		config: { mass: 1, tension: 170, friction: 26, duration: 500 },
	});

	return (
		<animated.span>
			{number.to((num: number) => parseInt(num.toFixed()).toLocaleString())}
		</animated.span>
	);
}

type FactionData = {
	[index: string]: any;
	currentFaction: string;
	red: {
		level: number;
		prestige: number;
		current: number;
		max: number;
	};
	orange: {
		level: number;
		prestige: number;
		current: number;
		max: number;
	};
	yellow: {
		level: number;
		prestige: number;
		current: number;
		max: number;
	};
	lime: {
		level: number;
		prestige: number;
		current: number;
		max: number;
	};
	green: {
		level: number;
		prestige: number;
		current: number;
		max: number;
	};
	cyan: {
		level: number;
		prestige: number;
		current: number;
		max: number;
	};
	aqua: {
		level: number;
		prestige: number;
		current: number;
		max: number;
	};
	blue: {
		level: number;
		prestige: number;
		current: number;
		max: number;
	};
	purple: {
		level: number;
		prestige: number;
		current: number;
		max: number;
	};
	pink: {
		level: number;
		prestige: number;
		current: number;
		max: number;
	};
};

export default function Faction(factionData: FactionData) {
	// The faction that is currently selected
	const [selectedFaction, setSelectedFaction] = useState(
		factionData.currentFaction
	);

	return (
		<div className="bg-gray-500 bg-opacity-50 p-2 rounded-lg">
			<div className="flex flex-wrap justify-center gap-2">
				{/* Faction Icons */}
				{factions.map((faction) => (
					<div key={faction}>
						<div
							className={`w-14 h-14 flex justify-center items-center rounded-full faction-colors transition-colors duration-500`}
							style={{
								backgroundColor:
									selectedFaction == faction ? `var(--${faction})` : "#a1a1a1",
							}}
							onClick={() => setSelectedFaction(faction)}
						>
							<div
								id={faction}
								className={`w-12 h-8 pixelated`}
								style={{
									backgroundImage: `url('/images/factions/${faction}/${factionData[faction].prestige}.png')`,
									backgroundRepeat: "no-repeat",
								}}
							/>
						</div>
						<div className="flex gap-1 justify-center">
							{/* Level */}
							{/* <span className="font-semibold">Level</span> */}
							<span className="text-neutral-300">
								{factionData[faction].level.toLocaleString()}
							</span>
						</div>
					</div>
				))}
			</div>
			{/* Faction Bars */}
			<div className="m-1">
				{/* Info */}
				<div className="flex flex-col md:flex-row md:gap-2">
					<div className="flex gap-1">
						{/* Level */}
						 <span className="font-semibold">Level</span>
						<span className="text-neutral-300">
							<Number {...{ n: factionData[selectedFaction].level }} />
						</span>
					</div>
					<div className="flex gap-1">
						{/* Prestige */}
						<span className="font-semibold">
							Prestige
							<span className="text-neutral-300">
								{" "}
								<Number {...{ n: factionData[selectedFaction].prestige }} />
							</span>
						</span>
					</div>
					<div className="md:ml-auto font-semibold">
						{/* XP */}
						<Number {...{ n: factionData[selectedFaction].current }} />
						/<Number {...{ n: factionData[selectedFaction].max }} /> XP
					</div>
				</div>
			</div>
			{/* Progress Bar */}
			<div
				className="h-3 left-0 right-0 rounded-md faction-colors transition-all duration-500"
				style={{ backgroundColor: `var(--${selectedFaction}-dark)` }}
			>
				<div
					className="h-full left-0 right-0 rounded-md text-center transition-all duration-500"
					style={{
						width: `calc(100% * ${(
							factionData[selectedFaction].current /
							factionData[selectedFaction].max
						).toFixed(4)})`,
						backgroundColor: `var(--${selectedFaction})`,
					}}
				></div>
			</div>
		</div>
	);
}
