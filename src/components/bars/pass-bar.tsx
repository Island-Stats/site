"use client";
import { Tooltip } from "@mui/material";
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

type PassData = {
	current: number;
	max: number;
	task1?: {
		current: number;
		max: number;
	};
	task2?: {
		current: number;
		max: number;
	};
	task3?: {
		current: number;
		max: number;
	};
	mastery?: {
		current: number;
		max: number;
	};
};

export default function PassBar({
	level, // Current level
	data, // Pass data
	passType, // Game name or Battle Pass
	type, // Type of pass
	premium, // Boolean for if the pass is premium or not
}: {
	level: number;
	data: PassData;
	passType: string;
	type: string;
	premium: boolean;
}) {

	// Pass info
	const [passOpen, setPassOpen] = useState(false);
	const passInfoRef = useRef<HTMLDivElement>(null);

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
			<Tooltip
				title={`Click to ${!passOpen ? "expand" : "collapse"}`}
				placement="top"
				classes={{
					tooltip:
						"bg-neutral-800 p-2 rounded-md text-center whitespace-nowrap",
					arrow: "text-sky-500",
				}}
				arrow
				PopperProps={{
					disablePortal: true,
				}}
			>
				<div
					className="grid gap-y-2 h-max bg-gray-500 bg-opacity-50 p-2 rounded-lg"
					onClick={() => {
						setPassOpen(!passOpen);
					}}
				>
					{/* Progress Bar */}
					<div className="ml-2 mt-2">
						<div
							className="w-4 h-4 scale-[2] pixelated float-left"
							style={{
								backgroundImage: `url('/images/passes/${passType}/${type}.png')`,
								backgroundRepeat: "no-repeat",
							}}
						></div>

						<span className="font-semibold ml-4">
							Level
							<span className="text-neutral-300"> {level}</span>
						</span>
						<div className="float-right font-semibold">
							{data.current.toLocaleString()}/{data.max.toLocaleString()} XP
						</div>
					</div>
					<div
						className="h-3 left-0 right-0 rounded-md mcc-colors"
						style={{ backgroundColor: `var(--${color()}-dark)` }}
					>
						<div
							className="h-full left-0 right-0 rounded-md text-center"
							style={{
								width: `calc(100% * ${(data.current / data.max).toFixed(4)})`,
								backgroundColor: `var(--${color()})`,
							}}
						></div>
					</div>
					<div
						className="transition-height duration-700 overflow-hidden"
						ref={passInfoRef}
						style={{
							height: passOpen ? passInfoRef.current?.scrollHeight : 0,
						}}
					>
						{/* Detailed Info */}
						<div className="grid grid-flow-col">
							<p className=" font-bold">{passNames[type]}</p>
							<p className="text-right">
								Premium: {premium ? "True" : "False"}
							</p>
						</div>
						{passType != "battle_pass" && (
							<>
								<hr className="mb-2" />
								<p>
									Pass Task 1: {data.task1!.current}/{data.task1!.max}
								</p>
								<p>
									Pass Task 2: {data.task2!.current}/{data.task2!.max}
								</p>
								<p>
									Pass Task 3: {data.task3!.current}/{data.task3!.max}
								</p>
								<p>
									Mastery Task: {data.mastery!.current}/{data.mastery!.max}
								</p>
							</>
						)}
					</div>
				</div>
			</Tooltip>
			{/* Tooltip */}
		</>
	);
}
