"use client";
import {
	useFloating,
	autoUpdate,
	arrow,
	FloatingArrow,
	offset,
	shift,
} from "@floating-ui/react";
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

export default function Rank({ rank }: { rank: string }) {
	const [visible, setVisible] = useState(false);

	const arrowRef = useRef(null);
	const { refs, floatingStyles, context } = useFloating({
		placement: "bottom",
		open: visible,
		onOpenChange: setVisible,
		middleware: [
			offset({
				mainAxis: 10,
			}),
			arrow({
				element: arrowRef,
			}),
			shift(),
		],
		whileElementsMounted: autoUpdate,
	});

	if (rank == "player") return null;
	return (
		<>
			<div
				className="w-10 h-10 pixelated"
				style={{
					backgroundImage: `url(/images/ranks/${
						RankImages[rank as keyof typeof RankImages]
					})`,
					backgroundSize: "cover",
				}}
				ref={refs.setReference}
				onClick={() => setVisible(!visible)}
			/>
			{visible && (
				<div ref={refs.setFloating} style={floatingStyles}>
					<div className="bg-neutral-800 p-2 -ml-4 rounded-md text-base">{RankNames[rank as keyof typeof RankNames]}</div>
					<FloatingArrow
						ref={arrowRef}
						context={context}
						className="mcc-colors -ml-2"
						style={{ fill: `var(--${rank})` }}
					/>
				</div>
			)}
		</>
	);
}
