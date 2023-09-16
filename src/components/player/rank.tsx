"use client";

import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";
import { useState, useRef } from "react";

const RankNames = {
	noxcrew: "Noxcrew",
	mod: "Mod",
	creator: "Creator",
	contestant: "Contestant",
	gc_royale: "Grand Champ Royale",
	grand_champ: "Grand Champ",
	champ: "Champ",
};

const RankImages = {
	noxcrew: "noxcrew.png",
	mod: "mod.png",
	creator: "creator.png",
	contestant: "contestant.png",
	gc_royale: "grand_champ_royale.png",
	grand_champ: "grand_champ.png",
	champ: "champ.png",
};

export default function Rank({
	rank,
	mcc_plus,
	playerName,
}: {
	rank: string;
	mcc_plus: { active: boolean; since: Date; till: Date };
	playerName: string;
}) {
	const RankTooltip = styled(
		({ className, classes, ...props }: TooltipProps) => (
			<Tooltip {...props} classes={{ popper: className, ...classes }} />
		)
	)(() => ({
		[`& .${tooltipClasses.arrow}`]: {
			color: `var(--${rank})`,
		},
	}));

	if (rank == "player") return null;

	return (
		<>
			<RankTooltip
				title={RankNames[rank as keyof typeof RankNames]}
				placement="bottom"
				classes={{ tooltip: "bg-neutral-800 text-base", arrow: "mcc-colors" }}
				arrow
			>
				<div
					className="w-10 h-10 pixelated rounded-md"
					style={{
						backgroundImage: `url(/images/ranks/${
							RankImages[rank as keyof typeof RankImages]
						})`,
						backgroundSize: "cover",
					}}
				/>
			</RankTooltip>
			<span className="font-semibold">{playerName}</span>
			{mcc_plus.active && (
				<Tooltip
					title={
						<div>
							<p className="font-semibold">MCC Plus</p>
							<p>Expires: {mcc_plus.till.toDateString()}</p>
						</div>
					}
					placement="bottom"
					classes={{
						tooltip: "bg-neutral-800 text-base text-center",
						arrow: "text-sky-500",
					}}
					arrow
				>
					<span>+</span>
				</Tooltip>
			)}
		</>
	);
}
