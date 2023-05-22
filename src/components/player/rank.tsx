import { type } from "os";

export enum Ranks {
	noxcrew = "Noxcrew",
	admin = "Admin",
	mod = "Mod",
	creator = "Creator",
	contestant = "Contestant",
	vip = "VIP",
	gc_royal = "Grand Champ Royale",
	grand_champ = "Grand Champ",
	champ = "Champ",
	player = 0,
}

export default function Rank({ rank }: { rank: Ranks }) {
	if (rank == Ranks.player) return null;
	const rankKey = Object.keys(Ranks)[Object.values(Ranks).indexOf(rank)]
	return (
		<div
			className="mcc-colors flex mt-1 px-4 rounded-full font-bold text-lg justify-center items-center"
			style={{ backgroundColor: `var(--${rankKey})` }}
		>
			{rank}{" "}
		</div>
	);
}
