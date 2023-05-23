import { type } from "os";

export const Ranks = {
	noxcrew: "Noxcrew",
	admin: "Admin",
	mod: "Mod",
	creator: "Creator",
	contestant: "Contestant",
	vip: "VIP",
	gc_royal: "Grand Champ Royale",
	grand_champ: "Grand Champ",
	champ: "Champ",
	player: "Player",
};

export default function Rank({ rank }: { rank: string }) {
	if (rank == Ranks.player) return null;
	return (
		<div
			className="mcc-colors flex mt-1 px-4 rounded-full font-bold text-lg justify-center items-center"
			style={{ backgroundColor: `var(--${rank})` }}
		>
			{Ranks[rank as keyof typeof Ranks]}{" "}
		</div>
	);
}
